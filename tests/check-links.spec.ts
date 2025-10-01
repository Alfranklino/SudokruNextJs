import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

interface LinkResult {
  text: string;
  href: string;
  status: 'working' | 'broken' | 'external';
  error?: string;
}

test('check all links in the application', async ({ page }) => {
  const baseURL = 'http://localhost:3000';
  const visitedPages = new Set<string>();
  const brokenLinks: LinkResult[] = [];
  const workingLinks: LinkResult[] = [];
  const screenshotsDir = path.join(process.cwd(), 'screenshots');

  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  async function checkPage(url: string) {
    if (visitedPages.has(url)) return;
    visitedPages.add(url);

    console.log(`\n📄 Checking page: ${url}`);

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      if (!response || response.status() >= 400) {
        console.log(`❌ Page failed to load: ${url} (Status: ${response?.status()})`);
        await page.screenshot({
          path: path.join(screenshotsDir, `broken-page-${visitedPages.size}.png`),
          fullPage: true
        });
        return;
      }

      // Get all links on the page
      const links = await page.locator('a[href]').all();
      console.log(`   Found ${links.length} links on this page`);

      for (const link of links) {
        const href = await link.getAttribute('href');
        const text = (await link.textContent())?.trim() || 'No text';

        if (!href) continue;

        // Skip anchors and mailto/tel links
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          continue;
        }

        // Determine if it's an external link
        const isExternal = href.startsWith('http') && !href.startsWith(baseURL);

        if (isExternal) {
          workingLinks.push({ text, href, status: 'external' });
          console.log(`   🌐 External: ${text} → ${href}`);
          continue;
        }

        // Convert relative URLs to absolute
        let fullURL = href;
        if (href.startsWith('/')) {
          fullURL = `${baseURL}${href}`;
        } else if (!href.startsWith('http')) {
          fullURL = `${baseURL}/${href}`;
        }

        // Check if link works
        try {
          console.log(`   🔍 Testing: ${text} → ${fullURL}`);

          // Click the link and check if it navigates
          await link.click({ timeout: 5000 });
          await page.waitForLoadState('networkidle', { timeout: 10000 });

          const currentURL = page.url();

          // Check for error states
          const errorText = await page.locator('text=/error|404|not found/i').count();

          if (errorText > 0 || currentURL.includes('404')) {
            brokenLinks.push({
              text,
              href: fullURL,
              status: 'broken',
              error: '404 or error page detected'
            });
            console.log(`   ❌ BROKEN: ${text} → ${fullURL}`);

            // Take screenshot of broken link
            await page.screenshot({
              path: path.join(screenshotsDir, `broken-link-${brokenLinks.length}-${text.replace(/[^a-z0-9]/gi, '_')}.png`),
              fullPage: true
            });
          } else {
            workingLinks.push({ text, href: fullURL, status: 'working' });
            console.log(`   ✅ Working: ${text} → ${fullURL}`);

            // Recursively check this page if it's internal and not visited
            if (!visitedPages.has(currentURL)) {
              await checkPage(currentURL);
            }
          }

          // Navigate back to original page
          await page.goto(url, { waitUntil: 'networkidle' });

        } catch (error) {
          brokenLinks.push({
            text,
            href: fullURL,
            status: 'broken',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          console.log(`   ❌ BROKEN: ${text} → ${fullURL} (${error})`);

          // Take screenshot of error state
          await page.screenshot({
            path: path.join(screenshotsDir, `broken-link-error-${brokenLinks.length}.png`),
            fullPage: true
          });

          // Try to go back to original page
          try {
            await page.goto(url, { waitUntil: 'networkidle' });
          } catch (e) {
            console.log(`   ⚠️  Could not return to ${url}`);
            break;
          }
        }
      }

    } catch (error) {
      console.log(`❌ Error checking page ${url}:`, error);
    }
  }

  // Start checking from homepage
  await checkPage(baseURL);

  // Generate report
  console.log('\n\n=================================');
  console.log('📊 LINK CHECK REPORT');
  console.log('=================================\n');

  console.log(`✅ Working Links: ${workingLinks.length}`);
  workingLinks.forEach((link, i) => {
    console.log(`   ${i + 1}. [${link.status.toUpperCase()}] "${link.text}" → ${link.href}`);
  });

  console.log(`\n❌ Broken Links: ${brokenLinks.length}`);
  brokenLinks.forEach((link, i) => {
    console.log(`   ${i + 1}. "${link.text}" → ${link.href}`);
    if (link.error) console.log(`      Error: ${link.error}`);
  });

  console.log(`\n📄 Pages Visited: ${visitedPages.size}`);
  visitedPages.forEach((page, i) => {
    console.log(`   ${i + 1}. ${page}`);
  });

  console.log(`\n📸 Screenshots saved to: ${screenshotsDir}`);
  console.log('=================================\n');

  // Save report to file
  const reportPath = path.join(screenshotsDir, 'link-check-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      workingLinks: workingLinks.length,
      brokenLinks: brokenLinks.length,
      pagesVisited: visitedPages.size
    },
    workingLinks,
    brokenLinks,
    visitedPages: Array.from(visitedPages)
  }, null, 2));

  console.log(`📄 Report saved to: ${reportPath}\n`);

  // Fail test if there are broken links
  expect(brokenLinks.length).toBe(0);
});
