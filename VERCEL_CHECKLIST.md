# Vercel Deployment Checklist

## ⚠️ Your deployment is failing because environment variables are missing!

The build works locally ✅ but fails on Vercel ❌ because Vercel doesn't have your API keys.

## Required Environment Variables for Vercel:

You need to add these 6 variables in your Vercel dashboard:

### Go to: 
https://vercel.com/hseinsbs-projects/divine-consultation/settings/environment-variables

### Add Each Variable:

#### 1. STRIPE_SECRET_KEY
- **Value**: Copy from your `.env.local` file (starts with `sk_live_`)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 2. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- **Value**: Copy from your `.env.local` file (starts with `pk_live_`)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 3. STRIPE_WEBHOOK_SECRET
- **Value**: Leave blank for now (we'll add this after the site deploys)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 4. GOOGLE_CLIENT_EMAIL
- **Value**: Copy from your `.env.local` file
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 5. GOOGLE_PRIVATE_KEY
- **Value**: Copy from your `.env.local` file (the ENTIRE key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
- **Important**: Copy it EXACTLY as it appears, including all `\n` characters
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 6. GOOGLE_CALENDAR_ID
- **Value**: `hussein.sbeiti.wb@gmail.com`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### Optional (but recommended):

#### 7. NEXT_PUBLIC_SITE_URL
- **Value**: `https://divine-consultation-1wuasecot-hseinsbs-projects.vercel.app`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 8. CONSULTATION_PRICE
- **Value**: `4900`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 9. CONSULTATION_DURATION_MINUTES
- **Value**: `60`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 10. CONSULTATION_TIMEZONE
- **Value**: `America/Toronto`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

---

## After Adding All Variables:

1. ✅ Make sure all variables are saved
2. ✅ Go to: https://vercel.com/hseinsbs-projects/divine-consultation/deployments
3. ✅ Click the 3 dots (...) on the latest deployment
4. ✅ Click "Redeploy"
5. ✅ Wait for the green checkmark ✓

---

## How to Copy from .env.local:

Open `/Users/husseinsbeiti/Desktop/Consultation/.env.local` in a text editor and copy each value directly.

**Important for GOOGLE_PRIVATE_KEY:**
- Copy the ENTIRE value including the quotes
- It should look like: `"-----BEGIN PRIVATE KEY-----\nMIIE...`
- Don't remove any `\n` characters - they need to be there!

---

## Once Deployed Successfully:

The site will work at: https://divine-consultation-1wuasecot-hseinsbs-projects.vercel.app

Then you'll need to:
1. Set up Stripe webhook (I'll help with this)
2. Test a booking
3. Verify calendar events are created

---

**Start by adding the environment variables now!**


