# Feature Flags - Usage Guide

## Quick Start

### 1. Wrap your app with FlagProvider

```tsx
// app/layout.tsx
import { FlagProvider } from '@/components/feature-flags';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FlagProvider loading={<div>Loading features...</div>}>
          {children}
        </FlagProvider>
      </body>
    </html>
  );
}
```

### 2. Use flags in your components

```tsx
// components/PremiumFeatures.tsx
import { FlagGuard } from '@/components/feature-flags';
import { FEATURE_FLAGS } from '@/types/feature-flags';

export function PremiumFeatures() {
  return (
    <FlagGuard
      flag={FEATURE_FLAGS.PREMIUM_ANALYTICS}
      fallback={<UpgradePrompt />}
    >
      <AdvancedAnalyticsDashboard />
    </FlagGuard>
  );
}
```

## Usage Patterns

### Pattern 1: Guard Component (Recommended)

Best for showing/hiding entire features:

```tsx
import { FlagGuard } from '@/components/feature-flags';

function TournamentPage() {
  return (
    <>
      <FlagGuard flag="new-tournament-bracket-ui" fallback={<OldBracketUI />}>
        <NewBracketUI />
      </FlagGuard>
    </>
  );
}
```

### Pattern 2: Hook (For Logic)

Best for conditional logic in components:

```tsx
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

function GameControls() {
  const { isEnabled, isLoading } = useFeatureFlag('collaborative-mode');

  if (isLoading) return <Spinner />;

  const handleStart = () => {
    if (isEnabled) {
      startCollaborativeGame();
    } else {
      startSoloGame();
    }
  };

  return <button onClick={handleStart}>Start Game</button>;
}
```

### Pattern 3: Simple Boolean Check

Best for simple show/hide:

```tsx
import { useFeatureFlagEnabled } from '@/hooks/useFeatureFlag';

function Navigation() {
  const showTournaments = useFeatureFlagEnabled('tournament-live-streaming');

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/play">Play</Link>
      {showTournaments && <Link href="/tournaments">Tournaments</Link>}
    </nav>
  );
}
```

### Pattern 4: Toggle Between States

Best for A/B testing:

```tsx
import { FlagToggle } from '@/components/feature-flags';

function HeroSection() {
  return (
    <FlagToggle
      flag="new-landing-page"
      on={<NewHero />}
      off={<OldHero />}
      loading={<HeroSkeleton />}
    />
  );
}
```

### Pattern 5: Batch Loading

Best for checking multiple flags:

```tsx
import { useFeatureFlagBatch } from '@/hooks/useFeatureFlagBatch';

function Dashboard() {
  const { flags, isLoading } = useFeatureFlagBatch([
    'premium-analytics',
    'new-tournament-ui',
    'collaborative-mode',
    'social-sharing',
  ]);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div>
      {flags['premium-analytics'] && <PremiumAnalytics />}
      {flags['new-tournament-ui'] && <Tournaments />}
      {flags['collaborative-mode'] && <CollaborativeGames />}
      {flags['social-sharing'] && <ShareButton />}
    </div>
  );
}
```

## Server-Side Rendering (SSR)

### Pre-load flags on the server:

```tsx
// app/layout.tsx (Server Component)
import { FlagProvider } from '@/components/feature-flags';
import { featureFlagService } from '@/lib/feature-flags';
import { buildMinimalContext } from '@/lib/feature-flags';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Evaluate flags on the server
  const context = buildMinimalContext();
  const initialFlags = await featureFlagService.evaluateAllFlags(context);

  return (
    <html lang="en">
      <body>
        <FlagProvider initialFlags={initialFlags}>
          {children}
        </FlagProvider>
      </body>
    </html>
  );
}
```

## Creating Flags via API

### Example: Create a new feature flag

```bash
curl -X POST http://localhost:3000/api/v1/flags \
  -H "Content-Type: application/json" \
  -d '{
    "key": "premium-analytics",
    "name": "Premium Analytics Dashboard",
    "description": "Advanced analytics for premium users",
    "enabled": true,
    "defaultValue": false,
    "rolloutPercent": 50,
    "environment": "ALL",
    "rules": [
      {
        "name": "Premium Users Only",
        "ruleType": "SUBSCRIPTION_TIER",
        "operator": "EQUALS",
        "value": "PREMIUM",
        "priority": 10
      }
    ]
  }'
```

### Example: Toggle a flag

```bash
curl -X POST http://localhost:3000/api/v1/flags/{flagId}/toggle \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "reason": "Enabling for production rollout"
  }'
```

### Example: Gradual Rollout

```bash
# Start at 10%
curl -X PUT http://localhost:3000/api/v1/flags/{flagId} \
  -H "Content-Type: application/json" \
  -d '{"rolloutPercent": 10}'

# Increase to 25%
curl -X PUT http://localhost:3000/api/v1/flags/{flagId} \
  -H "Content-Type: application/json" \
  -d '{"rolloutPercent": 25}'

# Full rollout
curl -X PUT http://localhost:3000/api/v1/flags/{flagId} \
  -H "Content-Type: application/json" \
  -d '{"rolloutPercent": 100}'
```

## Advanced Use Cases

### Use Case 1: High-Rated Players Only

```json
{
  "key": "ai-opponent",
  "name": "AI Opponent Beta",
  "enabled": true,
  "defaultValue": false,
  "rules": [
    {
      "name": "High Rated Players",
      "ruleType": "ELO_RATING",
      "operator": "GREATER_THAN_OR_EQUAL",
      "value": 1500,
      "priority": 10
    }
  ]
}
```

### Use Case 2: Mobile-Only Feature

```json
{
  "key": "mobile-redesign",
  "name": "Mobile UI Redesign",
  "enabled": true,
  "defaultValue": false,
  "rules": [
    {
      "name": "Mobile Devices Only",
      "ruleType": "DEVICE_TYPE",
      "operator": "EQUALS",
      "value": "mobile",
      "priority": 10
    }
  ]
}
```

### Use Case 3: Beta Testers

```json
{
  "key": "puzzle-editor",
  "name": "Puzzle Editor",
  "enabled": true,
  "defaultValue": false,
  "rules": [
    {
      "name": "Beta Testers",
      "ruleType": "USER_SEGMENT",
      "operator": "IN",
      "value": ["beta_testers", "admins"],
      "priority": 10
    }
  ]
}
```

### Use Case 4: Specific Users (Testing)

```json
{
  "key": "experimental-features",
  "name": "Experimental Features",
  "enabled": true,
  "defaultValue": false,
  "rules": [
    {
      "name": "Test Users",
      "ruleType": "USER_ID",
      "operator": "IN",
      "value": ["user-id-1", "user-id-2", "user-id-3"],
      "priority": 10
    }
  ]
}
```

## Type-Safe Flag Keys

Use the predefined flag constants for type safety:

```tsx
import { FEATURE_FLAGS } from '@/types/feature-flags';

// ✅ Type-safe
<FlagGuard flag={FEATURE_FLAGS.PREMIUM_ANALYTICS}>
  <Analytics />
</FlagGuard>

// ❌ Avoid magic strings (but still works)
<FlagGuard flag="premium-analytics">
  <Analytics />
</FlagGuard>
```

## Best Practices

1. **Use Guard Components for UI**: Prefer `<FlagGuard>` over hooks for conditional rendering
2. **Use Hooks for Logic**: Use `useFeatureFlag()` when you need conditional behavior
3. **Type-Safe Keys**: Always use `FEATURE_FLAGS` constants
4. **Gradual Rollouts**: Start at 10-25%, monitor, then increase
5. **Clean Up**: Remove old flags after full rollout (archive, then delete)
6. **Document Flags**: Add clear descriptions to all flags
7. **Test Both States**: Always test with flag ON and OFF
8. **SSR Support**: Pre-load critical flags on the server
9. **Error Boundaries**: Wrap flagged features in error boundaries
10. **Monitor Performance**: Track feature performance with analytics

## Debugging

### Check flag state in DevTools:

```tsx
import { useAllFeatureFlags } from '@/hooks/useFeatureFlagBatch';

function DebugFlags() {
  const { flags } = useAllFeatureFlags();

  return (
    <details>
      <summary>Feature Flags Debug</summary>
      <pre>{JSON.stringify(flags, null, 2)}</pre>
    </details>
  );
}
```

### Force refresh flags:

```tsx
import { useFeatureFlags } from '@/stores';

function RefreshButton() {
  const { refreshFlags } = useFeatureFlags();

  return <button onClick={refreshFlags}>Refresh Flags</button>;
}
```

## Testing

### Mock flags in tests:

```tsx
import { render } from '@testing-library/react';
import { useAppStore } from '@/stores';

test('shows premium features when flag is enabled', () => {
  // Mock the flag
  useAppStore.setState({
    flags: {
      'premium-analytics': {
        key: 'premium-analytics',
        enabled: true,
        value: true,
        reason: 'test',
      },
    },
    isInitialized: true,
  });

  const { getByText } = render(<PremiumFeatures />);
  expect(getByText('Advanced Analytics')).toBeInTheDocument();
});
```

## Troubleshooting

**Flags not loading?**
- Check network tab for API errors
- Verify `FlagProvider` is wrapping your app
- Check browser console for errors

**Flag always returns false?**
- Verify flag exists in database
- Check flag is enabled
- Verify rules match your context
- Check environment matches

**Performance issues?**
- Use `useFeatureFlagBatch()` for multiple flags
- Enable SSR pre-loading for critical flags
- Check cache TTL settings (default: 5 minutes)

## Migration Guide

### From hardcoded features:

```tsx
// Before
const isPremium = user?.subscription === 'PREMIUM';
{isPremium && <PremiumFeature />}

// After
<FlagGuard flag="premium-analytics">
  <PremiumFeature />
</FlagGuard>
```

### From environment variables:

```tsx
// Before
{process.env.NEXT_PUBLIC_ENABLE_TOURNAMENTS && <Tournaments />}

// After
<FlagGuard flag="tournament-system">
  <Tournaments />
</FlagGuard>
```

---

## Need Help?

- **Documentation**: Check `/docs/technical/feature_flags_guide.md`
- **API Reference**: See `/docs/technical/sudokru_api_spec.md`
- **Examples**: Browse `FEATURE_FLAGS_USAGE.md` (this file)
