# ElderVoice Guardian - Deployment Guide

This guide explains how to deploy the ElderVoice Guardian frontend application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- Git repository with your code pushed to GitHub, GitLab, or Bitbucket
- Node.js and npm installed locally (for testing)

## Project Structure

The frontend application is located in the `Frontend/` directory of this repository. All deployment configuration has been set up with this structure in mind.

## Quick Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

1. **Log in to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel will automatically detect it's a Vite application

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `Frontend` (IMPORTANT: Set this to the Frontend folder)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

4. **Environment Variables** (if needed)
   - Add any environment variables from `.env.example`
   - Make sure to prefix all variables with `VITE_` for Vite to recognize them

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to the Frontend directory
cd /Users/karansharma/Desktop/Frontend/practice/ElderVoice-Guardian/Frontend

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Configuration Files

The following files have been configured for optimal Vercel deployment:

- **`vercel.json`** - Configures SPA routing, security headers, and caching
- **`vite.config.ts`** - Optimized build settings with code splitting
- **`.gitignore`** - Excludes build artifacts and sensitive files
- **`.env.example`** - Template for environment variables

## Testing Before Deployment

Always test your production build locally before deploying:

```bash
# Navigate to Frontend directory
cd Frontend

# Create a production build
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to test the production build locally.

## Post-Deployment Checklist

After deploying, verify the following:

- ✅ Homepage loads correctly
- ✅ All navigation routes work (no 404 errors)
- ✅ Images and assets load properly
- ✅ Responsive design works on mobile and desktop
- ✅ No console errors in browser DevTools
- ✅ Fonts load correctly (Google Fonts)

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Continuous Deployment

Vercel automatically sets up continuous deployment:

- **Main branch** - Automatically deploys to production
- **Other branches** - Create preview deployments
- **Pull requests** - Generate preview URLs for testing

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure `Frontend/` is set as the root directory
- Verify all dependencies are in `package.json`

### 404 Errors on Routes

- The `vercel.json` configuration handles SPA routing
- If issues persist, verify the rewrites configuration

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_`
- Add them in Vercel Dashboard under "Settings" → "Environment Variables"
- Redeploy after adding variables

### Slow Build Times

- Build times should be 1-2 minutes
- If slower, check for large dependencies
- Consider optimizing imports and bundle size

## Support

For Vercel-specific issues, consult:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

For application issues, check the project repository.
