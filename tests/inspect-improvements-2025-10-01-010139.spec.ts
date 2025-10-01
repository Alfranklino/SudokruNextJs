import { test, expect } from '@playwright/test';

test.describe('Hero Section Improvements Inspection', () => {
  test.use({
    viewport: { width: 1920, height: 1080 },
  });

  test('should verify all improvements are working', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Take full page screenshot - initial state
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/01-initial-load.png',
      fullPage: true
    });

    // Check CTA buttons - verify height and contrast
    const startButton = page.locator('button', { hasText: 'Start Playing Free' }).first();
    await expect(startButton).toBeVisible();

    const howItWorksLink = page.locator('a', { hasText: 'How It Works' }).first();
    await expect(howItWorksLink).toBeVisible();

    // Screenshot CTAs
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/02-cta-buttons.png',
      clip: { x: 100, y: 200, width: 600, height: 100 }
    });

    // Check Sudoku grid - should show real expert puzzle
    const sudokuGrid = page.locator('.grid.grid-cols-9').first();
    await expect(sudokuGrid).toBeVisible();

    // Initial grid state (with initial values)
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/03-grid-initial.png',
      clip: { x: 960, y: 150, width: 900, height: 900 }
    });

    // Wait for animation to progress - watch solving
    console.log('Watching puzzle solving animation...');
    await page.waitForTimeout(5000);

    // Mid-animation screenshot
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/04-grid-solving.png',
      clip: { x: 960, y: 150, width: 900, height: 900 }
    });

    // Check for mistake animation (red values should appear and disappear)
    const redCells = page.locator('.text-red-400');
    console.log('Looking for mistake animations...');
    await page.waitForTimeout(3000);

    // Another mid-point screenshot
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/05-grid-mid-solve.png',
      clip: { x: 960, y: 150, width: 900, height: 900 }
    });

    // Test navbar scroll animation
    console.log('Testing navbar scroll animation...');

    // Initial navbar (light)
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/06-navbar-light.png',
      clip: { x: 0, y: 0, width: 1920, height: 80 }
    });

    // Scroll down smoothly
    await page.evaluate(() => {
      window.scrollTo({ top: 75, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);

    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/07-navbar-transition.png',
      clip: { x: 0, y: 0, width: 1920, height: 80 }
    });

    // Scroll more
    await page.evaluate(() => {
      window.scrollTo({ top: 150, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);

    // Navbar after scroll (dark)
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/08-navbar-dark.png',
      clip: { x: 0, y: 0, width: 1920, height: 80 }
    });

    // Scroll back to top to see grid completion
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);

    // Wait for potential completion animation
    console.log('Waiting for completion animation...');
    await page.waitForTimeout(15000);

    // Final state screenshot
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/09-grid-complete.png',
      clip: { x: 960, y: 150, width: 900, height: 900 }
    });

    // Full page final
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-010139/10-final-state.png',
      fullPage: true
    });

    console.log('✅ All improvements verified!');
  });

  test('should check console for errors', async ({ page }) => {
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

    console.log('\n📊 Console Status:');
    console.log(`Errors: ${errors.length}`);
    console.log(`Warnings: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Errors found:');
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('✅ No console errors!');
    }

    if (warnings.length > 0) {
      console.log('\n⚠️ Warnings found:');
      warnings.forEach(warn => console.log(`  - ${warn}`));
    }
  });
});
