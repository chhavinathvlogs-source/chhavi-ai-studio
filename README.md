# CHHAVI AI STUDIO

A modern, professional AI studio platform built with Next.js 16, featuring premium co-founder team showcase, Google Firebase authentication, dark/light mode, Hindi/English language support, and a comprehensive AI features grid.

## Features

✅ **Premium Co-Founder Team Card**
- Gradient purple background with glowing animation
- Side-by-side team member cards with avatar icons
- Hover animations and smooth transitions

✅ **Authentication**
- Google Sign-in with Firebase
- Session management
- Protected main app view

✅ **Theme Support**
- Dark mode (default)
- Light mode
- Persistent theme preference using localStorage

✅ **Bilingual Support**
- English (default)
- Hindi (हिंदी)
- Language toggle with persistent storage

✅ **AI Features Grid**
- 14 interactive feature cards
- Responsive grid layout
- Hover effects with elevation and glow

✅ **Responsive Design**
- Mobile-first approach
- Works on desktop, tablet, and mobile
- Auto-fit grid for features

## Project Structure

```
app/
├── page.tsx           # Main login and app page with Firebase auth
├── layout.tsx         # Root layout with metadata
├── globals.css        # Theme variables and animations
└── demo/
    └── page.tsx       # Demo page showing logged-in view
```

## Environment Variables

To enable Firebase authentication, add these environment variables in your project settings:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### How to Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Click on "Project Settings" (gear icon)
4. Under "General" tab, scroll down to find your configuration
5. Copy the credentials to your `.env.local` or project settings

## Features Overview

### Login Screen
- Beautiful gradient background
- Google authentication button
- Clean, modern UI
- Works with or without Firebase (demo mode available)

### Main App
- Responsive navbar with theme and language toggles
- Premium co-founder team showcase with glowing border
- 14 AI features in an interactive grid
- Smooth animations and hover effects

### Demo Mode
Access the demo view to see the full app without authentication:
- Visit `/demo` route
- No Firebase credentials required
- Full theme and language toggle functionality

## Theme System

The app uses CSS variables for theming:

```css
/* Dark Mode (default) */
--bg: #0f172a
--card: #1e293b
--text: #f8fafc
--accent: #6366f1
--accent-light: #818cf8
--border-color: #334155

/* Light Mode */
--bg: #f1f5f9
--card: #ffffff
--text: #0f172a
--accent: #4f46e5
--accent-light: #6366f1
--border-color: #cbd5e1
```

## Animations

- **Splash Screen**: 2-second fade-out animation
- **Glow Animation**: Continuous glowing effect on the team card (3s)
- **Hover Effects**: Cards lift and glow on hover
- **Smooth Transitions**: All color and transform changes use 0.3s ease

## Customization

### Change Co-Founder Information
Edit the translations object in `page.tsx`:

```typescript
const translations = {
  en: {
    coFounderName1: 'Chhavi Nath Nagesh',
    coFounderName2: 'Parmeshwar Nagesh',
    coFounderTitle: 'CEO & Founder',
    coFounderRole2: 'Co-Founder',
    // ... more translations
  },
  hi: {
    // Hindi translations
  },
};
```

### Add More Features
Update the features array in the translations:

```typescript
features: [
  '💬 AI Chat',
  '🖼️ Text to Image',
  '🎨 Image to Image',
  // Add more features here
]
```

### Customize Colors
Modify the theme variables in `globals.css`:

```css
:root {
  --accent: #6366f1;           /* Change purple accent */
  --accent-light: #818cf8;     /* Change lighter accent */
  --bg: #0f172a;               /* Change background */
  /* ... more variables */
}
```

## Development

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### Test Routes
- `/` - Login screen (requires Firebase or shows demo mode)
- `/demo` - Full app view (no authentication required)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Optimizations

- CSS variables for instant theme switching
- LocalStorage for persisting user preferences
- Optimized animations using CSS keyframes
- Responsive images with proper sizing
- Fast Refresh during development

## Future Enhancements

Consider adding:
- Backend API integration for AI features
- User profile customization
- Settings panel
- Feature tutorial/onboarding
- Social sharing
- Analytics tracking

## License

MIT License - feel free to use and modify for your projects

## Support

For Firebase setup issues, visit:
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)

## Credits

Built with:
- Next.js 16
- React 19
- Tailwind CSS
- Firebase Authentication
- TypeScript
