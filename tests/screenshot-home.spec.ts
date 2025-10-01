import { test } from '@playwright/test';

test('Screenshot home page hero section', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // Take full page screenshot
  await page.screenshot({
    path: 'screenshots/home-page-full.png',
    fullPage: true
  });

  // Take hero section screenshot
  await page.screenshot({
    path: 'screenshots/home-page-viewport.png'
  });

  // Take screenshot of just the hero section
  const heroSection = page.locator('section').first();
  await heroSection.screenshot({
    path: 'screenshots/home-hero-section.png'
  });
});
