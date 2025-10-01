# Public Assets Directory

This directory contains static assets that are served directly by Next.js.

## Structure

```
public/
├── images/          # PNG, JPG, WebP, GIF images
├── icons/           # SVG icons, favicon files
├── fonts/           # Custom web fonts (if not using next/font)
└── avatars/         # User avatar images
```

## Usage

All files in `/public` are accessible from the root URL path.

### Images (Next.js Image component - recommended)
```tsx
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={100}
/>
```

### Icons
```tsx
<img src="/icons/trophy.svg" alt="Trophy" />
```

### Background Images
```tsx
<div style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }} />
```

## Best Practices

1. **Use `/images` for**: Photos, illustrations, hero images, feature graphics
2. **Use `/icons` for**: SVG icons, favicons, app icons
3. **Use `/fonts` for**: Custom font files (.woff2, .woff)
4. **Use `/avatars` for**: User profile pictures, default avatars

## Image Optimization

- Always use `next/image` when possible for automatic optimization
- Prefer WebP format for better compression
- Use descriptive filenames: `hero-background.jpg` not `img1.jpg`
- Keep file sizes reasonable (compress before uploading)

## File Naming

- Use kebab-case: `user-profile-icon.svg`
- Be descriptive: `tournament-trophy.png`
- Include dimensions for multiple sizes: `logo-200x100.png`
