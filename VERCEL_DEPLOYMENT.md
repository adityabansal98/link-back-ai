# Vercel Deployment Guide

## Environment Variables Setup

You need to add the following environment variables in your Vercel project settings:

### Steps:
1. Go to your Vercel dashboard: https://vercel.com
2. Select your project: `new-year-connections`
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

### Required Environment Variables:

#### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

#### Google Gemini API
```
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

#### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### After Adding Variables:
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger automatic redeployment

## Important Notes:
- Make sure all variables are added for **Production**, **Preview**, and **Development** environments
- The `NEXT_PUBLIC_*` variables are exposed to the browser
- Keep `CLERK_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` secret (they're server-only)

## Deployment Status:
Once environment variables are set, the deployment should succeed automatically on the next push or manual redeploy.

