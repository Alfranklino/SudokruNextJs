import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

test('inspect home page - navbar and footer components', async ({ page }) => {
  // Navigate to home page
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Take full page screenshot
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-022213/01-full-page.png',
    fullPage: true
  });

  // Check navbar exists and is visible
  const navbar = page.locator('nav').first();
  await expect(navbar).toBeVisible();

  // Check for brand logo in navbar
  const navbarLogo = page.locator('nav img[alt="Sudokru"]').first();
  await expect(navbarLogo).toBeVisible();

  // Take navbar screenshot
  await navbar.screenshot({
    path: 'screenshots/home/2025-10-01-022213/02-navbar.png'
  });

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Check footer exists and is visible
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();

  // Check for gold logo in footer
  const footerLogo = page.locator('footer img[alt="Sudokru"]');
  await expect(footerLogo).toBeVisible();

  // Take footer screenshot
  await footer.screenshot({
    path: 'screenshots/home/2025-10-01-022213/03-footer.png'
  });

  // Check footer columns exist
  const productLinks = page.locator('footer h3:has-text("Product")');
  const companyLinks = page.locator('footer h3:has-text("Company")');
  const supportLinks = page.locator('footer h3:has-text("Support")');

  await expect(productLinks).toBeVisible();
  await expect(companyLinks).toBeVisible();
  await expect(supportLinks).toBeVisible();

  // Test navbar on scroll (scroll effect)
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: 'screenshots/home/2025-10-01-022213/04-navbar-scrolled.png'
  });

  // Capture console errors
  const consoleMessages: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  console.log('Console messages:', consoleMessages);
});
