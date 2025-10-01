import { test, expect } from '@playwright/test';

test.describe('Dashboard Interactions - Fixed', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate when clicking Quick Play header button', async ({ page }) => {
    await page.click('text=⚡ Quick Play');
    await page.waitForURL('**/play/quick');
    expect(page.url()).toContain('/play/quick');
  });

  test('should navigate when clicking Join Tournament header button', async ({ page }) => {
    await page.click('button:has-text("🏆 Join Tournament")');
    await page.waitForURL('**/tournaments');
    expect(page.url()).toContain('/tournaments');
  });

  test('should navigate when clicking Find Match button', async ({ page }) => {
    await page.click('button:has-text("⚡ Find Match")');
    await page.waitForURL('**/play/quick');
    expect(page.url()).toContain('/play/quick');
  });

  test('should navigate when clicking Start Challenge button', async ({ page }) => {
    await page.click('button:has-text("🎯 Start Challenge")');
    await page.waitForURL('**/challenge/daily');
    expect(page.url()).toContain('/challenge/daily');
  });

  test('should navigate when clicking Continue Playing tournament button', async ({ page }) => {
    await page.click('button:has-text("🔥 Continue Playing")');
    await page.waitForURL('**/tournaments');
    expect(page.url()).toContain('/tournaments');
  });

  test('should navigate when clicking Join Tournament buttons', async ({ page }) => {
    // There are multiple "Join Tournament" buttons, test the first one
    const joinButtons = await page.locator('button:has-text("Join Tournament")').all();
    if (joinButtons.length > 0) {
      await joinButtons[0].click();
      await page.waitForURL('**/tournaments');
      expect(page.url()).toContain('/tournaments');
    }
  });

  test('should navigate when clicking View All in Recent Games', async ({ page }) => {
    await page.click('a:has-text("View All"):near(:text("Recent Games"))');
    await page.waitForURL('**/game/history');
    expect(page.url()).toContain('/game/history');
  });

  test('should navigate when clicking Play button on game entry', async ({ page }) => {
    // Click the first Play button in Recent Games
    const playButtons = await page.locator('button:has(svg.lucide-play)').all();
    if (playButtons.length > 0) {
      await playButtons[0].click();
      await page.waitForURL('**/game/history');
      expect(page.url()).toContain('/game/history');
    }
  });

  test('should navigate when clicking Eye button on game entry', async ({ page }) => {
    // Click the first Eye button in Recent Games
    const eyeButtons = await page.locator('button:has(svg.lucide-eye)').all();
    if (eyeButtons.length > 0) {
      await eyeButtons[0].click();
      await page.waitForURL('**/game/spectate');
      expect(page.url()).toContain('/game/spectate');
    }
  });

  test('should navigate when clicking Browse All in Tournament Highlights', async ({ page }) => {
    await page.click('a:has-text("Browse All"):near(:text("Tournament Highlights"))');
    await page.waitForURL('**/tournaments');
    expect(page.url()).toContain('/tournaments');
  });

  test('should navigate when clicking View All in Daily Challenge leaderboard', async ({ page }) => {
    // Find the "View All" button in the Daily Challenge section
    const dailyChallengeSection = page.locator('text=Daily Challenge').locator('..');
    await dailyChallengeSection.locator('button:has-text("View All")').click();
    await page.waitForURL('**/challenge/daily');
    expect(page.url()).toContain('/challenge/daily');
  });

  test('should navigate when clicking View Detailed Statistics', async ({ page }) => {
    await page.click('a:has-text("View Detailed Statistics")');
    await page.waitForURL('**/stats');
    expect(page.url()).toContain('/stats');
  });

  test('should navigate when clicking View All in Friends section', async ({ page }) => {
    await page.click('a:has-text("View All"):near(:text("Friends"))');
    await page.waitForURL('**/friends');
    expect(page.url()).toContain('/friends');
  });

  test('should navigate when clicking Add Friend button', async ({ page }) => {
    await page.click('a:has-text("Add Friend")');
    await page.waitForURL('**/friends');
    expect(page.url()).toContain('/friends');
  });

  test('should navigate to Single Player from Quick Play modes', async ({ page }) => {
    await page.click('a:has-text("🎮 Single Player")');
    await page.waitForURL('**/play/single');
    expect(page.url()).toContain('/play/single');
  });

  test('should navigate to Quick Match from Quick Play modes', async ({ page }) => {
    await page.click('a:has-text("⚡ Quick Match")');
    await page.waitForURL('**/play/quick');
    expect(page.url()).toContain('/play/quick');
  });

  test('should navigate to Custom Game from Quick Play modes', async ({ page }) => {
    await page.click('a:has-text("🎯 Custom Game")');
    await page.waitForURL('**/play/custom');
    expect(page.url()).toContain('/play/custom');
  });

  test('should navigate to Tournaments from Quick Play modes', async ({ page }) => {
    await page.click('a:has-text("🏆 Tournaments")');
    await page.waitForURL('**/tournaments');
    expect(page.url()).toContain('/tournaments');
  });
});
