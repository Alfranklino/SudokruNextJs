import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1920, height: 1080 }
});

test.describe('Home Page Hero Section Inspection', () => {
  test('inspect hero section with all features', async ({ page }) => {
    const consoleMessages: string[] = [];
    const consoleErrors: string[] = [];

    // Capture console messages
    page.on('console', msg => {
      const text = msg.text();
      consoleMessages.push(`[${msg.type()}] ${text}`);
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
    });

    // Navigate to home page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // 1. Take full page screenshot
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/01-full-page.png',
      fullPage: true
    });

    // 2. Check navbar light theme (initial state)
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/02-navbar-light.png',
      clip: { x: 0, y: 0, width: 1920, height: 80 }
    });

    // 3. Check hero section with dark theme
    const heroSection = page.locator('section').first();
    await heroSection.screenshot({
      path: 'screenshots/home/2025-10-01-001824/03-hero-section-dark.png'
    });

    // 4. Verify animated Sudoku grid is visible
    const sudokuGrid = page.locator('text=1').first();
    await expect(sudokuGrid).toBeVisible({ timeout: 5000 });

    // Wait for some animations to occur
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/04-sudoku-grid-animating.png',
      clip: { x: 900, y: 200, width: 600, height: 600 }
    });

    // 5. Check CTA buttons
    const primaryCTA = page.locator('button:has-text("Start Playing Free")');
    await expect(primaryCTA).toBeVisible();
    await primaryCTA.screenshot({
      path: 'screenshots/home/2025-10-01-001824/05-primary-cta.png'
    });

    const secondaryCTA = page.locator('text=How It Works').first();
    await expect(secondaryCTA).toBeVisible();

    // 6. Check social proof elements
    const socialProof = page.locator('text=10,000+');
    await expect(socialProof).toBeVisible();
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/06-social-proof.png',
      clip: { x: 0, y: 400, width: 800, height: 150 }
    });

    // 7. Check feature highlights
    const realTimeBattles = page.locator('text=Real-time Battles');
    const tournaments = page.locator('text=Tournaments');
    const socialGaming = page.locator('text=Social Gaming');

    await expect(realTimeBattles).toBeVisible();
    await expect(tournaments).toBeVisible();
    await expect(socialGaming).toBeVisible();

    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/07-feature-highlights.png',
      clip: { x: 0, y: 550, width: 800, height: 150 }
    });

    // 8. Test scroll effect on navbar
    await page.evaluate(() => window.scrollTo(0, 150));
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/08-navbar-dark-scrolled.png',
      clip: { x: 0, y: 0, width: 1920, height: 80 }
    });

    // Scroll back up
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // 9. Test responsive design - Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/09-tablet-view.png',
      fullPage: true
    });

    // 10. Test responsive design - Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/10-mobile-view.png',
      fullPage: true
    });

    // Reset to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    // 11. Wait for potential confetti animation
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000); // Wait for full animation cycle

    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/11-animation-complete.png',
      clip: { x: 900, y: 200, width: 600, height: 600 }
    });

    // Write console log summary
    const fs = require('fs');
    fs.writeFileSync(
      'screenshots/home/2025-10-01-001824/console-logs.txt',
      consoleMessages.join('\n')
    );

    // Final full page screenshot
    await page.screenshot({
      path: 'screenshots/home/2025-10-01-001824/12-final-state.png',
      fullPage: true
    });

    console.log('✅ Inspection complete!');
    console.log(`Console errors found: ${consoleErrors.length}`);
  });
});
