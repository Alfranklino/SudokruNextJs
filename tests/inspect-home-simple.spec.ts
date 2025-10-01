import { test, expect } from '@playwright/test';

test.use({
  headless: false
});

test('Home Page Hero Section - Complete Inspection', async ({ page }) => {
  const consoleErrors: string[] = [];

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to home page
  console.log('📍 Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  // 1. Full page screenshot
  console.log('📸 Taking full page screenshot...');
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-001824/01-full-page.png',
    fullPage: true
  });

  // 2. Check navbar (light mode initially)
  console.log('🔍 Checking navbar - light mode...');
  const navbar = page.locator('nav').first();
  await navbar.screenshot({
    path: 'screenshots/home/2025-10-01-001824/02-navbar-light.png'
  });

  // 3. Check hero section exists
  console.log('🔍 Checking hero section...');
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-001824/03-hero-section.png',
    clip: { x: 0, y: 80, width: 1920, height: 900 }
  });

  // 4. Verify main heading
  console.log('✅ Verifying headline text...');
  await expect(page.locator('text=Sudoku Evolved')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('text=Multiplayer Reimagined')).toBeVisible();

  // 5. Check CTA buttons
  console.log('🔍 Checking CTA buttons...');
  const primaryCTA = page.locator('button:has-text("Start Playing Free")');
  await expect(primaryCTA).toBeVisible();

  // 6. Wait for Sudoku grid animation to start
  console.log('⏳ Waiting for Sudoku grid animation...');
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: 'screenshots/home/2025-10-01-001824/04-grid-animating.png',
    clip: { x: 900, y: 200, width: 600, height: 700 }
  });

  // 7. Test scroll effect on navbar
  console.log('🔄 Testing navbar scroll effect...');
  await page.evaluate(() => window.scrollBy(0, 200));
  await page.waitForTimeout(1000);

  await navbar.screenshot({
    path: 'screenshots/home/2025-10-01-001824/05-navbar-dark-scrolled.png'
  });

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // 8. Test mobile responsive
  console.log('📱 Testing mobile view...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-001824/06-mobile-view.png',
    fullPage: true
  });

  // 9. Test tablet responsive
  console.log('📱 Testing tablet view...');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'screenshots/home/2025-10-01-001824/07-tablet-view.png',
    fullPage: true
  });

  // Reset to desktop
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 10. Wait for full animation cycle (including confetti)
  console.log('🎉 Waiting for full animation cycle...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(12000); // Wait for complete cycle

  await page.screenshot({
    path: 'screenshots/home/2025-10-01-001824/08-animation-complete.png',
    fullPage: false,
    clip: { x: 800, y: 150, width: 700, height: 700 }
  });

  console.log('✅ Inspection complete!');
  console.log(`Console errors found: ${consoleErrors.length}`);

  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }
});
