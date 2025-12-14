# 🚀 GitHub Pages Deployment Guide

## Quick Setup for GitHub Pages

### 1. Create GitHub Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Renewable Energy vs Netflix Dashboard"

# Add remote origin (replace with your username)
git remote add origin https://github.com/yourusername/renewable-netflix-dashboard.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### 3. Update Configuration
Before pushing, update these files with your GitHub username:

**next.config.js** - Update the basePath:
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
```

**components/LandingPage.tsx** - Update GitHub links:
```javascript
onClick={() => window.open('https://github.com/yourusername/renewable-netflix-dashboard', '_blank')}
```

### 4. Your Live Site
After deployment, your dashboard will be available at:
```
https://yourusername.github.io/renewable-netflix-dashboard/
```

## Features of the Landing Page

### 🎨 Professional Design
- Gradient backgrounds with glassmorphism effects
- Animated elements and hover effects
- Responsive design for all devices
- Dark theme with accent colors

### 🚀 Interactive Elements
- **LIVE DEMO** button launches the dashboard
- **VISIT SITE** button links to GitHub repository
- Smooth transitions and animations
- Professional badge system

### 📊 Feature Showcase
- Interactive visualizations highlight
- Correlation analysis explanation
- Anomaly detection capabilities
- AI-accelerated development metrics

### 🛠️ Tech Stack Display
- Modern technology badges
- Hover effects on tech stack items
- Clear development approach explanation

### 📖 Quick Start Guide
- Step-by-step installation instructions
- Code snippets with syntax highlighting
- Easy copy-paste commands

## Customization Options

### Update Repository Links
Replace all instances of `yourusername/renewable-netflix-dashboard` with your actual GitHub repository.

### Modify Color Scheme
The landing page uses a green/blue sustainability theme. You can customize colors in the Tailwind classes:
- Green accents: `from-green-400 to-emerald-500`
- Blue accents: `from-blue-400 to-cyan-500`
- Background: `from-slate-900 via-purple-900 to-slate-900`

### Add Screenshots
Consider adding dashboard screenshots to the landing page for better visual appeal.

### Analytics Integration
Add Google Analytics or other tracking to monitor visitor engagement.

## Performance Optimizations

The deployment includes:
- ✅ Static site generation for fast loading
- ✅ Optimized images and assets
- ✅ Minified CSS and JavaScript
- ✅ CDN delivery via GitHub Pages
- ✅ Mobile-responsive design

## SEO Optimization

The landing page includes:
- Semantic HTML structure
- Descriptive meta tags
- Proper heading hierarchy
- Alt text for images
- Fast loading times

Your professional dashboard is now ready for GitHub Pages deployment! 🎉