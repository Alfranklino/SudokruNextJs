import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

test('launch browser and navigate to app', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:3000');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Take a screenshot
  await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });

  console.log('Browser launched! Screenshot saved to homepage-screenshot.png');
});
