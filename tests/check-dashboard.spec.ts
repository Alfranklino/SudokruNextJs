import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

interface InteractionResult {
  element: string;
  type: 'button' | 'link' | 'card';
  action: string;
  status: 'working' | 'broken' | 'no-action';
  destination?: string;
  error?: string;
}

test('check dashboard page interactions', async ({ page }) => {
  const screenshotsDir = path.join(process.cwd(), 'screenshots', 'dashboard');
  const results: InteractionResult[] = [];

  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('\n🎯 Starting Dashboard Page Interaction Test...\n');

  // Navigate to dashboard
  console.log('📄 Navigating to dashboard...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle' });

  // Take initial screenshot
  await page.screenshot({
    path: path.join(screenshotsDir, '1-dashboard-initial.png'),
    fullPage: true
  });

  console.log('✅ Dashboard loaded successfully\n');

  // Get all buttons on the page
  const buttons = await page.locator('button').all();
  console.log(`Found ${buttons.length} buttons on dashboard\n`);

  // Get all links on the page
  const links = await page.locator('a').all();
  console.log(`Found ${links.length} links on dashboard\n`);

  // Test each button
  console.log('🔘 Testing Buttons:\n');
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    try {
      // Get button text
      const buttonText = (await button.textContent())?.trim() || `Button ${i + 1}`;

      // Skip if button is disabled
      const isDisabled = await button.isDisabled();
      if (isDisabled) {
        console.log(`   ⏭️  Skipped (disabled): "${buttonText}"`);
        continue;
      }

      console.log(`   🔍 Testing button: "${buttonText}"`);

      // Get current URL before click
      const urlBefore = page.url();

      // Click the button
      await button.click({ timeout: 5000 });

      // Wait a bit for navigation or modal
      await page.waitForTimeout(1000);

      // Check if URL changed
      const urlAfter = page.url();

      if (urlBefore !== urlAfter) {
        console.log(`      ✅ Navigation successful: ${urlAfter}`);
        results.push({
          element: buttonText,
          type: 'button',
          action: 'click',
          status: 'working',
          destination: urlAfter
        });

        // Take screenshot of destination
        await page.screenshot({
          path: path.join(screenshotsDir, `button-${i + 1}-${buttonText.replace(/[^a-z0-9]/gi, '_')}.png`),
          fullPage: true
        });

        // Go back to dashboard
        await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
      } else {
        // Check if a modal appeared
        const modal = await page.locator('[role="dialog"], .modal, [class*="modal"]').count();
        if (modal > 0) {
          console.log(`      ✅ Modal/Dialog opened`);
          results.push({
            element: buttonText,
            type: 'button',
            action: 'click',
            status: 'working',
            destination: 'Modal opened'
          });

          // Take screenshot of modal
          await page.screenshot({
            path: path.join(screenshotsDir, `button-${i + 1}-${buttonText.replace(/[^a-z0-9]/gi, '_')}-modal.png`),
            fullPage: true
          });

          // Close modal if possible
          const closeButton = page.locator('button:has-text("Close"), button:has-text("Cancel"), [aria-label="Close"]').first();
          if (await closeButton.count() > 0) {
            await closeButton.click();
          }
        } else {
          console.log(`      ⚠️  No visible action detected`);
          results.push({
            element: buttonText,
            type: 'button',
            action: 'click',
            status: 'no-action',
            error: 'Button clicked but no navigation or modal detected'
          });

          // Take screenshot showing no action
          await page.screenshot({
            path: path.join(screenshotsDir, `button-${i + 1}-${buttonText.replace(/[^a-z0-9]/gi, '_')}-no-action.png`),
            fullPage: true
          });
        }
      }
    } catch (error) {
      const buttonText = (await button.textContent())?.trim() || `Button ${i + 1}`;
      console.log(`      ❌ Error: ${error}`);
      results.push({
        element: buttonText,
        type: 'button',
        action: 'click',
        status: 'broken',
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      // Take screenshot of error state
      await page.screenshot({
        path: path.join(screenshotsDir, `button-${i + 1}-${buttonText.replace(/[^a-z0-9]/gi, '_')}-error.png`),
        fullPage: true
      });
    }
  }

  console.log('\n🔗 Testing Links:\n');

  // Test each link
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    try {
      const linkText = (await link.textContent())?.trim() || `Link ${i + 1}`;
      const href = await link.getAttribute('href');

      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        console.log(`   ⏭️  Skipped: "${linkText}" (${href || 'no href'})`);
        continue;
      }

      console.log(`   🔍 Testing link: "${linkText}" → ${href}`);

      // Get current URL
      const urlBefore = page.url();

      // Click the link
      await link.click({ timeout: 5000 });

      // Wait for navigation
      await page.waitForLoadState('networkidle', { timeout: 10000 });

      const urlAfter = page.url();

      // Check for error pages
      const errorText = await page.locator('text=/404|error|not found/i').count();

      if (errorText > 0 || urlAfter.includes('404')) {
        console.log(`      ❌ Link broken: leads to error page`);
        results.push({
          element: linkText,
          type: 'link',
          action: 'navigate',
          status: 'broken',
          destination: urlAfter,
          error: '404 or error page'
        });

        await page.screenshot({
          path: path.join(screenshotsDir, `link-${i + 1}-${linkText.replace(/[^a-z0-9]/gi, '_')}-error.png`),
          fullPage: true
        });
      } else {
        console.log(`      ✅ Link works: ${urlAfter}`);
        results.push({
          element: linkText,
          type: 'link',
          action: 'navigate',
          status: 'working',
          destination: urlAfter
        });

        await page.screenshot({
          path: path.join(screenshotsDir, `link-${i + 1}-${linkText.replace(/[^a-z0-9]/gi, '_')}.png`),
          fullPage: true
        });
      }

      // Go back to dashboard
      await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

    } catch (error) {
      const linkText = (await link.textContent())?.trim() || `Link ${i + 1}`;
      console.log(`      ❌ Error: ${error}`);
      results.push({
        element: linkText,
        type: 'link',
        action: 'navigate',
        status: 'broken',
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      await page.screenshot({
        path: path.join(screenshotsDir, `link-${i + 1}-${linkText.replace(/[^a-z0-9]/gi, '_')}-error.png`),
        fullPage: true
      });

      // Try to go back to dashboard
      try {
        await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle' });
      } catch (e) {
        console.log(`      ⚠️  Could not return to dashboard`);
      }
    }
  }

  // Generate Report
  console.log('\n\n=================================');
  console.log('📊 DASHBOARD INTERACTION REPORT');
  console.log('=================================\n');

  const working = results.filter(r => r.status === 'working');
  const broken = results.filter(r => r.status === 'broken');
  const noAction = results.filter(r => r.status === 'no-action');

  console.log(`✅ Working Interactions: ${working.length}`);
  working.forEach((r, i) => {
    console.log(`   ${i + 1}. [${r.type.toUpperCase()}] "${r.element}" → ${r.destination}`);
  });

  console.log(`\n❌ Broken Interactions: ${broken.length}`);
  broken.forEach((r, i) => {
    console.log(`   ${i + 1}. [${r.type.toUpperCase()}] "${r.element}"`);
    if (r.destination) console.log(`      Destination: ${r.destination}`);
    if (r.error) console.log(`      Error: ${r.error}`);
  });

  console.log(`\n⚠️  No Action Detected: ${noAction.length}`);
  noAction.forEach((r, i) => {
    console.log(`   ${i + 1}. [${r.type.toUpperCase()}] "${r.element}"`);
    if (r.error) console.log(`      Note: ${r.error}`);
  });

  console.log(`\n📸 Screenshots saved to: ${screenshotsDir}`);
  console.log('=================================\n');

  // Save detailed report
  const reportPath = path.join(screenshotsDir, 'dashboard-interaction-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    page: 'Dashboard',
    url: 'http://localhost:3000/dashboard',
    summary: {
      totalInteractions: results.length,
      working: working.length,
      broken: broken.length,
      noAction: noAction.length
    },
    results: results
  }, null, 2));

  console.log(`📄 Detailed report saved to: ${reportPath}\n`);

  // Summary
  console.log('📝 SUMMARY:');
  console.log(`   Total elements tested: ${results.length}`);
  console.log(`   Working: ${working.length} (${((working.length / results.length) * 100).toFixed(1)}%)`);
  console.log(`   Broken: ${broken.length} (${((broken.length / results.length) * 100).toFixed(1)}%)`);
  console.log(`   No action: ${noAction.length} (${((noAction.length / results.length) * 100).toFixed(1)}%)\n`);
});
