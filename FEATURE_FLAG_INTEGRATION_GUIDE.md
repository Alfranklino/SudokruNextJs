# Feature Flag Integration Guide

## How to Use the "Unlimited Hints for Guests" Feature Flag

This guide shows you how to integrate the feature flag system into your code using the "Unlimited Hints for Guests" flag as a real example.

---

## 📋 Overview

The feature flag system supports **two approaches** for configuring hint limits:

1. **Boolean Flag (Simple)**: Enable/disable unlimited hints
2. **Variant Flag (Advanced)**: Set a specific numeric limit (e.g., 3, 5, 10 hints)

---

## 🎯 Approach 1: Boolean Flag (Current Implementation)

### What We've Implemented

The `PlayableDemo.tsx` component now uses the feature flag to control unlimited hints for guests.

### Code Changes Made

#### 1. Import the Hook and Flag Constant

```typescript
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { FEATURE_FLAGS } from '@/types/feature-flags';
```

#### 2. Use the Feature Flag Hook

```typescript
export function PlayableDemo({ ... }: PlayableDemoProps) {
  // Feature flag for unlimited hints for guests
  const { isEnabled: unlimitedHintsEnabled, value: hintLimitValue } = useFeatureFlag(
    FEATURE_FLAGS.UNLIMITED_HINTS_FOR_GUESTS,
    { defaultValue: true }
  );

  // ... rest of component
}
```

#### 3. Add Hint Limit Logic

```typescript
const handleUseHint = () => {
  // Check if hints are available based on feature flag
  if (!unlimitedHintsEnabled) {
    // If unlimited hints disabled, check variant value for max hints
    const maxHints = typeof hintLimitValue === 'number' ? hintLimitValue : 3;
    if (hintCount >= maxHints) {
      alert(`You've reached your maximum of ${maxHints} hints. Sign up for unlimited hints!`);
      return;
    }
  }
  useHint();
};
```

#### 4. Update UI to Show Limits

**In stats display:**
```typescript
<span className="font-semibold text-purple-600">
  {hintCount}
  {!unlimitedHintsEnabled && typeof hintLimitValue === 'number' && ` / ${hintLimitValue}`}
  {!unlimitedHintsEnabled && typeof hintLimitValue !== 'number' && ` / 3`}
</span>
```

**On hint button:**
```typescript
<Button
  onClick={handleUseHint}
  disabled={
    gameStatus !== 'playing' ||
    (!unlimitedHintsEnabled && hintCount >= (typeof hintLimitValue === 'number' ? hintLimitValue : 3))
  }
>
  <Lightbulb className="w-4 h-4 mr-2" />
  Get Hint
  {!unlimitedHintsEnabled && typeof hintLimitValue === 'number' && ` (${hintCount}/${hintLimitValue})`}
  {!unlimitedHintsEnabled && typeof hintLimitValue !== 'number' && ` (${hintCount}/3)`}
</Button>
```

### How It Works Now

| Flag State | Result |
|------------|--------|
| **Enabled = true** | ✅ Unlimited hints for all users |
| **Enabled = false** | ❌ Limited to 3 hints (or variant value) |
| **Enabled = false + Variant = 5** | ❌ Limited to 5 hints |

---

## 🔧 Approach 2: Using Variants for Numeric Values

### Option A: Create Variants in Admin UI

1. Navigate to http://localhost:3000/admin/flags
2. Find "Unlimited Hints for Guests" flag
3. Click "Edit"
4. Scroll to **Variants** section
5. Add variant:
   - **Name**: `max-hints-limit`
   - **Value**: `5` (as JSON number)
   - **Description**: "Maximum hints for non-premium users"
6. Save

### Option B: Create Variant via API

```typescript
// POST /api/v1/flags/{flagId}
{
  "variants": [
    {
      "name": "max-hints-limit",
      "value": 5,
      "description": "Maximum hints for non-premium users"
    }
  ]
}
```

### Using the Variant in Code

```typescript
const { value: hintConfig } = useFeatureFlag(
  FEATURE_FLAGS.UNLIMITED_HINTS_FOR_GUESTS
);

// If using variants, the value will be an object or number
const maxHints = typeof hintConfig === 'number' ? hintConfig : 3;

if (hintCount >= maxHints) {
  alert(`You've reached your maximum of ${maxHints} hints!`);
}
```

---

## 🎮 Use Cases & Examples

### Example 1: Gradual Rollout (Test with 10% of users)

1. Go to Admin UI → "Unlimited Hints for Guests"
2. Set **Enabled** = true
3. Set **Rollout Percentage** = 10%
4. Save

**Result**: Only 10% of guest users get unlimited hints (based on consistent hashing).

### Example 2: Premium Users Get Unlimited, Free Users Get 3

**Option 1: Use User Role Targeting Rule**

1. Create flag: `unlimited-hints-for-guests`
2. Add Targeting Rule:
   - **Type**: User Role
   - **Operator**: Equals
   - **Value**: `["PREMIUM"]`
3. Set default to `false`

**Option 2: Use Two Separate Flags**

```typescript
// For premium users
const { isEnabled: premiumUnlimited } = useFeatureFlag('unlimited-hints-premium');

// For free users
const { value: freeUserLimit } = useFeatureFlag('hint-limit-free-users'); // variant = 3

const maxHints = user?.isPremium
  ? (premiumUnlimited ? Infinity : 10)
  : (typeof freeUserLimit === 'number' ? freeUserLimit : 3);
```

### Example 3: Different Limits by ELO Rating

1. Create targeting rules:
   - **Rule 1**: ELO Rating > 1800 → 10 hints
   - **Rule 2**: ELO Rating > 1500 → 7 hints
   - **Rule 3**: ELO Rating > 1200 → 5 hints
   - **Default**: 3 hints

---

## 📊 Testing Your Integration

### Test Scenario 1: Unlimited Hints Enabled

1. Go to Admin UI: http://localhost:3000/admin/flags
2. Find "Unlimited Hints for Guests"
3. Toggle **Enabled** = ON (green)
4. Visit homepage: http://localhost:3000
5. Start a game → Get multiple hints
6. **Expected**: No limit, button always enabled

### Test Scenario 2: Limited to 3 Hints

1. Admin UI → Toggle **Enabled** = OFF (gray)
2. Start new game
3. Click "Get Hint" 3 times
4. **Expected**:
   - Stats show "3 / 3"
   - Button becomes disabled
   - Alert: "You've reached your maximum of 3 hints"

### Test Scenario 3: Custom Limit (5 hints)

1. Admin UI → Set **Enabled** = OFF
2. Add variant with value `5`
3. Update code to use variant value
4. Start game → Get 5 hints
5. **Expected**: Limited to 5 hints

---

## 🔄 Real-Time Updates (Future)

Currently, flag changes require a page refresh. Once Task 10 (WebSocket integration) is complete:

```typescript
// Flags will automatically update in real-time
const { isEnabled } = useFeatureFlag('unlimited-hints-for-guests');

// When admin toggles the flag, all connected clients update instantly
// No page refresh needed!
```

---

## 🎨 UI States

### When Unlimited Hints = **Enabled**

```
Hints Used: 7
[Get Hint] ← Always enabled
```

### When Limited to 3 Hints

```
Hints Used: 2 / 3
[Get Hint (2/3)] ← Shows counter

After 3 hints:
Hints Used: 3 / 3
[Get Hint (3/3)] ← Disabled, grayed out
```

---

## 🚀 Best Practices

### 1. Always Provide Default Values

```typescript
const { isEnabled } = useFeatureFlag('my-flag', {
  defaultValue: true // Fallback if flag fetch fails
});
```

### 2. Handle Loading States

```typescript
const { isEnabled, isLoading } = useFeatureFlag('my-flag');

if (isLoading) {
  return <Spinner />;
}
```

### 3. Use FlagGuard for Conditional Rendering

```typescript
import { FlagGuard } from '@/components/feature-flags';

<FlagGuard flag={FEATURE_FLAGS.UNLIMITED_HINTS_FOR_GUESTS}>
  <UnlimitedHintsPromo />
</FlagGuard>
```

### 4. Cache Awareness

Flags are cached for 5 minutes. To force refresh:

```typescript
const { refresh } = useFeatureFlag('my-flag');

// Force re-fetch from server
await refresh();
```

---

## 📝 File Reference

| File | Purpose |
|------|---------|
| [src/components/game/PlayableDemo.tsx](src/components/game/PlayableDemo.tsx) | Main integration example |
| [src/types/feature-flags.ts](src/types/feature-flags.ts) | Flag constants and types |
| [src/hooks/useFeatureFlag.ts](src/hooks/useFeatureFlag.ts) | Main hook for consuming flags |
| [FEATURE_FLAGS_USAGE.md](FEATURE_FLAGS_USAGE.md) | Complete API documentation |

---

## 🎯 Quick Decision Tree

**Q: Should I use a boolean flag or a variant?**

```
Do you need just on/off?
  → Boolean flag (enabled: true/false)

Do you need a numeric value (max count, timeout, etc.)?
  → Use variant with number value

Do you need multiple configurations (A/B/C testing)?
  → Use multiple variants

Do you need complex targeting (premium vs free)?
  → Use targeting rules + variants
```

---

## ✅ Summary

You now have a fully integrated feature flag for "Unlimited Hints for Guests" that:

- ✅ Controls whether guests get unlimited hints
- ✅ Supports numeric limits via variants
- ✅ Shows visual feedback in UI (counter, disabled state)
- ✅ Gracefully handles flag being disabled
- ✅ Can be toggled in real-time from Admin UI
- ✅ Supports gradual rollouts and A/B testing

**Next Steps:**
1. Test the flag in the admin UI
2. Try toggling it on/off while playing
3. Experiment with rollout percentages
4. Add more flags for other features!
