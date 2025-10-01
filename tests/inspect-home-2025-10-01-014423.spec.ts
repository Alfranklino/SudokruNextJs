import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

test('inspect home page hero section - logo above header', async ({ page }) => {
  // Navigate to home page
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Wait for hero section to be visible
  await page.waitForSelector('section', { state: 'visible' });

  // Take full page screenshot
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-014423/01-full-page.png',
    fullPage: true
  });

  // Check if logo is present in hero section
  const logo = page.locator('img[alt="Sudokru"]').first();
  await expect(logo).toBeVisible();

  // Take screenshot of hero section only
  const heroSection = page.locator('section').first();
  await heroSection.screenshot({
    path: 'screenshots/home/2025-10-01-014423/02-hero-section.png'
  });

  // Check if heading is present
  const heading = page.locator('h1').filter({ hasText: 'Sudoku Evolved' });
  await expect(heading).toBeVisible();

  // Take screenshot of logo and heading together
  const contentDiv = page.locator('div.space-y-8').first();
  await contentDiv.screenshot({
    path: 'screenshots/home/2025-10-01-014423/03-logo-and-heading.png'
  });

  // Check mobile responsive view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-014423/04-mobile-view.png',
    fullPage: true
  });

  // Check tablet responsive view
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-014423/05-tablet-view.png',
    fullPage: true
  });

  // Back to desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500);

  // Capture console errors
  const consoleMessages: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  console.log('Console messages:', consoleMessages);
});
