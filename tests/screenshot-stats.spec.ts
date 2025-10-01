import { test } from '@playwright/test';

test('Screenshot stats page', async ({ page }) => {
  await page.goto('http://localhost:3000/stats');
  await page.waitForLoadState('networkidle');

  // Take full page screenshot
  await page.screenshot({
    path: 'screenshots/stats-page-full.png',
    fullPage: true
  });

  // Take viewport screenshot
  await page.screenshot({
    path: 'screenshots/stats-page-viewport.png'
  });
});
