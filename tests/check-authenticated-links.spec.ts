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

test('check all authenticated pages and links', async ({ page }) => {
  const baseURL = 'http://localhost:3000';
  const visitedPages = new Set<string>();
  const brokenLinks: LinkResult[] = [];
  const workingLinks: LinkResult[] = [];
  const screenshotsDir = path.join(process.cwd(), 'screenshots');

  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('\n🔐 Starting authenticated link checker...\n');

  // Step 1: Go to login page
  console.log('📄 Navigating to login page...');
  await page.goto(`${baseURL}/login`, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.join(screenshotsDir, '1-login-page.png'),
    fullPage: true
  });

  // Step 2: Fill in fake credentials
  console.log('✍️  Filling in fake credentials...');
  const fakeEmail = 'test@example.com';
  const fakePassword = 'password123';

  // Find and fill email input
  const emailInput = page.locator('input[type="email"], input[name*="email" i], input[placeholder*="email" i]').first();
  await emailInput.fill(fakeEmail);

  // Find and fill password input
  const passwordInput = page.locator('input[type="password"], input[name*="password" i]').first();
  await passwordInput.fill(fakePassword);

  await page.screenshot({
    path: path.join(screenshotsDir, '2-login-filled.png'),
    fullPage: true
  });

  // Step 3: Submit login form
  console.log('🚀 Submitting login form...');
  const submitButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Log In"), button:has-text("Login")').first();
  await submitButton.click();

  // Wait for navigation or error
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(screenshotsDir, '3-after-login-submit.png'),
    fullPage: true
  });

  const currentURL = page.url();
  console.log(`📍 Current URL after login: ${currentURL}`);

  // Check if we're redirected or get error
  const errorMessage = await page.locator('text=/error|invalid|incorrect|failed/i').count();
  if (errorMessage > 0) {
    console.log('⚠️  Login form showed validation errors (expected with fake credentials)');
    const errorText = await page.locator('text=/error|invalid|incorrect|failed/i').first().textContent();
    console.log(`   Error message: "${errorText}"`);
  }

  // Check function for pages
  async function checkPage(url: string, pageName: string) {
    if (visitedPages.has(url)) return;
    visitedPages.add(url);

    console.log(`\n📄 Checking page: ${pageName} (${url})`);

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      if (!response || response.status() >= 400) {
        console.log(`❌ Page failed to load: ${url} (Status: ${response?.status()})`);
        brokenLinks.push({
          text: pageName,
          href: url,
          status: 'broken',
          error: `HTTP ${response?.status()}`
        });
        await page.screenshot({
          path: path.join(screenshotsDir, `broken-${pageName.replace(/[^a-z0-9]/gi, '_')}.png`),
          fullPage: true
        });
        return;
      }

      // Check for redirect to login (protected route)
      const finalURL = page.url();
      if (finalURL.includes('/login') && !url.includes('/login')) {
        console.log(`🔒 Protected route - redirected to login: ${url}`);
        brokenLinks.push({
          text: pageName,
          href: url,
          status: 'broken',
          error: 'Protected route - requires authentication'
        });
        await page.screenshot({
          path: path.join(screenshotsDir, `protected-${pageName.replace(/[^a-z0-9]/gi, '_')}.png`),
          fullPage: true
        });
        return;
      }

      // Check for 404 or error pages
      const errorText = await page.locator('text=/404|not found|error/i').count();
      if (errorText > 0) {
        console.log(`❌ Error page detected: ${url}`);
        brokenLinks.push({
          text: pageName,
          href: url,
          status: 'broken',
          error: '404 or error page'
        });
        await page.screenshot({
          path: path.join(screenshotsDir, `error-${pageName.replace(/[^a-z0-9]/gi, '_')}.png`),
          fullPage: true
        });
        return;
      }

      console.log(`✅ Page loaded successfully: ${pageName}`);
      workingLinks.push({ text: pageName, href: url, status: 'working' });
      await page.screenshot({
        path: path.join(screenshotsDir, `success-${pageName.replace(/[^a-z0-9]/gi, '_')}.png`),
        fullPage: true
      });

      // Get all links on this page
      const links = await page.locator('a[href]').all();
      console.log(`   Found ${links.length} links on this page`);

      for (const link of links) {
        const href = await link.getAttribute('href');
        const text = (await link.textContent())?.trim() || 'No text';

        if (!href) continue;

        // Skip anchors, mailto, tel, and external links
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          continue;
        }

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

        // Test the link
        if (!visitedPages.has(fullURL)) {
          console.log(`   🔍 Found link: ${text} → ${fullURL}`);
          try {
            await link.click({ timeout: 5000 });
            await page.waitForLoadState('networkidle', { timeout: 10000 });

            const linkURL = page.url();
            const linkErrorText = await page.locator('text=/404|not found|error/i').count();

            if (linkErrorText > 0) {
              console.log(`   ❌ Link leads to error: ${text}`);
              brokenLinks.push({
                text,
                href: fullURL,
                status: 'broken',
                error: 'Error page'
              });
              await page.screenshot({
                path: path.join(screenshotsDir, `broken-link-${text.replace(/[^a-z0-9]/gi, '_')}.png`),
                fullPage: true
              });
            } else {
              console.log(`   ✅ Link works: ${text}`);
              workingLinks.push({ text, href: fullURL, status: 'working' });

              // Recursively check new pages
              if (!visitedPages.has(linkURL) && linkURL.startsWith(baseURL)) {
                await checkPage(linkURL, text);
              }
            }

            // Navigate back
            await page.goto(url, { waitUntil: 'networkidle' });

          } catch (error) {
            console.log(`   ❌ Error testing link: ${text} - ${error}`);
            brokenLinks.push({
              text,
              href: fullURL,
              status: 'broken',
              error: error instanceof Error ? error.message : 'Unknown error'
            });
            await page.screenshot({
              path: path.join(screenshotsDir, `error-link-${text.replace(/[^a-z0-9]/gi, '_')}.png`),
              fullPage: true
            });

            try {
              await page.goto(url, { waitUntil: 'networkidle' });
            } catch (e) {
              console.log(`   ⚠️  Could not return to ${url}`);
              break;
            }
          }
        }
      }

    } catch (error) {
      console.log(`❌ Error checking page ${url}:`, error);
      brokenLinks.push({
        text: pageName,
        href: url,
        status: 'broken',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Test common authenticated routes
  console.log('\n🔍 Testing common authenticated routes...\n');

  const routesToTest = [
    { url: `${baseURL}/dashboard`, name: 'Dashboard' },
    { url: `${baseURL}/game`, name: 'Game' },
    { url: `${baseURL}/game/play`, name: 'Play Game' },
    { url: `${baseURL}/game/single-player`, name: 'Single Player' },
    { url: `${baseURL}/profile`, name: 'Profile' },
    { url: `${baseURL}/settings`, name: 'Settings' },
    { url: `${baseURL}/leaderboard`, name: 'Leaderboard' },
    { url: `${baseURL}/tournaments`, name: 'Tournaments' },
  ];

  for (const route of routesToTest) {
    await checkPage(route.url, route.name);
  }

  // Generate report
  console.log('\n\n=================================');
  console.log('📊 AUTHENTICATED LINK CHECK REPORT');
  console.log('=================================\n');

  console.log(`✅ Working/Accessible Links: ${workingLinks.length}`);
  workingLinks.forEach((link, i) => {
    console.log(`   ${i + 1}. [${link.status.toUpperCase()}] "${link.text}" → ${link.href}`);
  });

  console.log(`\n❌ Broken/Protected Links: ${brokenLinks.length}`);
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
  const reportPath = path.join(screenshotsDir, 'authenticated-link-check-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    testCredentials: {
      email: fakeEmail,
      password: '[REDACTED]'
    },
    summary: {
      workingLinks: workingLinks.length,
      brokenLinks: brokenLinks.length,
      protectedRoutes: brokenLinks.filter(l => l.error?.includes('Protected')).length,
      pagesVisited: visitedPages.size
    },
    workingLinks,
    brokenLinks,
    visitedPages: Array.from(visitedPages)
  }, null, 2));

  console.log(`📄 Report saved to: ${reportPath}\n`);

  // Print summary
  console.log('\n📝 SUMMARY:');
  console.log(`   Total working: ${workingLinks.length}`);
  console.log(`   Total broken/protected: ${brokenLinks.length}`);
  console.log(`   Protected routes (require auth): ${brokenLinks.filter(l => l.error?.includes('Protected')).length}`);
  console.log(`   Actual errors: ${brokenLinks.filter(l => !l.error?.includes('Protected')).length}\n`);
});
