import { test } from '@playwright/test';

test('Screenshot home page CTA sections', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');

  // Scroll to bottom CTA section
  await page.locator('text=Ready to Join the Competition?').scrollIntoViewIfNeeded();

  // Wait a moment for smooth scroll
  await page.waitForTimeout(500);

  // Screenshot the CTA section
  const ctaSection = page.locator('section:has-text("Ready to Join the Competition?")');
  await ctaSection.screenshot({
    path: 'screenshots/home-bottom-cta.png'
  });
});
