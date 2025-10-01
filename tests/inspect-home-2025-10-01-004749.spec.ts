import { test, expect } from '@playwright/test';

test.describe('Home Page Hero Section Inspection', () => {
  test.use({
    viewport: { width: 1920, height: 1080 },
  });

  test('should inspect hero section elements and animations', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Wait for hero section to be visible
    await page.waitForSelector('section.min-h-screen', { timeout: 10000 });

    // Take full page screenshot
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/01-full-page.png',
      fullPage: true
    });

    // Check navbar - initial light state
    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/02-navbar-light.png',
      clip: { x: 0, y: 0, width: 1920, height: 100 }
    });

    // Check hero section background
    const heroSection = page.locator('section.min-h-screen').first();
    await expect(heroSection).toBeVisible();
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/03-hero-section.png',
      clip: { x: 0, y: 100, width: 1920, height: 900 }
    });

    // Check headline
    const headline = page.locator('h1', { hasText: 'Sudoku Evolved' });
    await expect(headline).toBeVisible();

    // Check gradient text
    const gradientText = page.locator('span.text-transparent', { hasText: 'Multiplayer Reimagined' });
    await expect(gradientText).toBeVisible();

    // Check CTA buttons
    const startButton = page.locator('button', { hasText: 'Start Playing Free' });
    await expect(startButton).toBeVisible();

    const howItWorksButton = page.locator('a', { hasText: 'How It Works' });
    await expect(howItWorksButton).toBeVisible();

    // Check social proof elements
    const avatarStack = page.locator('.flex.-space-x-2').first();
    await expect(avatarStack).toBeVisible();

    const playerCount = page.locator('text=10,000+ players worldwide');
    await expect(playerCount).toBeVisible();

    // Check ratings
    const rating = page.locator('text=4.9');
    await expect(rating).toBeVisible();

    // Check feature highlights
    const realtimeBattles = page.locator('text=Real-time Battles');
    await expect(realtimeBattles).toBeVisible();

    const tournaments = page.locator('text=Tournaments');
    await expect(tournaments).toBeVisible();

    const socialGaming = page.locator('text=Social Gaming');
    await expect(socialGaming).toBeVisible();

    // Check animated Sudoku grid
    const sudokuGrid = page.locator('.grid.grid-cols-9').first();
    await expect(sudokuGrid).toBeVisible();

    // Wait a moment for animation to start
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/04-grid-animating.png',
      clip: { x: 960, y: 200, width: 900, height: 700 }
    });

    // Scroll down to trigger navbar dark mode
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/05-navbar-dark-scrolled.png',
      clip: { x: 0, y: 0, width: 1920, height: 100 }
    });

    // Test responsive - mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/06-mobile-view.png',
      fullPage: true
    });

    // Test responsive - tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/07-tablet-view.png',
      fullPage: true
    });

    // Back to desktop - wait for animation completion
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Wait for animation cycle to complete (~10 seconds)
    console.log('Waiting for animation completion...');
    await page.waitForTimeout(10000);

    await page.screenshot({
      path: 'screenshots/home/2025-10-01-004749/08-animation-complete.png',
      clip: { x: 960, y: 200, width: 900, height: 700 }
    });

    // Check scroll indicator
    const scrollIndicator = page.locator('.animate-bounce').first();
    await expect(scrollIndicator).toBeVisible();

    console.log('✅ Hero section inspection complete!');
  });

  test('should capture console errors', async ({ page }) => {
    const errors: string[] = [];
    const warnings: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

    console.log('\n📊 Console Messages:');
    console.log(`Errors: ${errors.length}`);
    console.log(`Warnings: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Errors found:');
      errors.forEach(err => console.log(`  - ${err}`));
    }

    if (warnings.length > 0) {
      console.log('\n⚠️ Warnings found:');
      warnings.forEach(warn => console.log(`  - ${warn}`));
    }
  });
});
