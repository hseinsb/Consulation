# 🚀 Google Calendar + Stripe Booking System Setup Guide

## Overview
Your new custom booking system allows users to:
1. See your real-time availability from Google Calendar
2. Select a time slot
3. Pay via Stripe FIRST
4. Booking is created in Google Calendar ONLY after successful payment

**No more ghost bookings! No monthly fees!**

---

## 📋 Setup Checklist

### Step 1: Google Calendar API Setup (15 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Select a project" dropdown
   - Click "New Project"
   - Name it: "Divine Consultation Booking"
   - Click "Create"

3. **Enable Google Calendar API**
   - In the search bar, type "Google Calendar API"
   - Click on it
   - Click "Enable"

4. **Create Service Account**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: `consultation-booking`
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

5. **Create Service Account Key**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose "JSON"
   - Download the file (keep it safe!)

6. **Share Your Calendar**
   - Open Google Calendar (calendar.google.com)
   - Find your calendar in the left sidebar
   - Click the three dots → "Settings and sharing"
   - Scroll to "Share with specific people"
   - Click "Add people"
   - Paste the service account email (from the JSON file: `client_email`)
   - Give "Make changes to events" permission
   - Click "Send"

7. **Get Your Calendar ID**
   - In Calendar settings, scroll to "Integrate calendar"
   - Copy the "Calendar ID" (usually your email)

---

### Step 2: Stripe Setup (10 minutes)

1. **Create/Login to Stripe**
   - Visit: https://dashboard.stripe.com
   - Create account or sign in

2. **Get API Keys**
   - Toggle to "Test mode" (top right)
   - Go to "Developers" → "API keys"
   - Copy these keys:
     - **Publishable key** (starts with `pk_test_`)
     - **Secret key** (starts with `sk_test_`)

3. **Set Up Webhook** (Do this AFTER deploying to Vercel)
   - Go to "Developers" → "Webhooks"
   - Click "Add endpoint"
   - Endpoint URL: `https://your-site.vercel.app/api/webhooks/stripe`
   - Select event: `checkout.session.completed`
   - Copy the "Signing secret" (starts with `whsec_`)

---

### Step 3: Environment Variables (5 minutes)

Create a file `.env.local` in your project root:

```bash
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# Google Calendar (from downloaded JSON file)
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Settings
CONSULTATION_PRICE=4900
CONSULTATION_DURATION_MINUTES=60
CONSULTATION_TIMEZONE=America/New_York

# URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important:**
- For `GOOGLE_PRIVATE_KEY`, copy the entire key from JSON including the `\n` characters
- Keep the quotes around it
- `CONSULTATION_PRICE` is in cents (4900 = $49.00)

---

### Step 4: Test Locally (5 minutes)

1. **Install dependencies** (if not done):
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Test the booking flow**:
   - Go to http://localhost:3000/thank-you
   - Scroll to booking section
   - Select a date and time
   - Click "Proceed to Payment"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date and any CVC

4. **Check your Google Calendar** - you should see the event!

---

### Step 5: Deploy to Vercel (10 minutes)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add custom booking system"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to vercel.com
   - Import your GitHub repository
   - Add all environment variables (same as `.env.local`)
   - Deploy!

3. **Set up Stripe Webhook**:
   - Copy your Vercel URL: `https://your-site.vercel.app`
   - Go back to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-site.vercel.app/api/webhooks/stripe`
   - Copy the webhook secret
   - Add it to Vercel environment variables: `STRIPE_WEBHOOK_SECRET`
   - Redeploy

4. **Update Site URL**:
   - In Vercel environment variables
   - Change `NEXT_PUBLIC_SITE_URL` to your Vercel URL
   - Redeploy

---

## ✅ You're Done!

Your custom booking system is live! Features:

- ✅ Real-time availability from your Google Calendar
- ✅ Payment BEFORE booking (no ghost bookings)
- ✅ Automatic Google Meet link creation
- ✅ Email confirmations to you and customer
- ✅ Calendar reminders
- ✅ No monthly fees
- ✅ Full control over UI/UX

---

## 🎨 Customization

### Change Price
Edit `.env.local`:
```bash
CONSULTATION_PRICE=9900  # $99.00
```

### Change Duration
```bash
CONSULTATION_DURATION_MINUTES=90  # 90-minute sessions
```

### Change Working Hours
Edit `app/api/availability/route.ts`:
```typescript
const workStartHour = 10  // Start at 10 AM
const workEndHour = 18    // End at 6 PM
```

---

## 🐛 Troubleshooting

### "Calendar not configured" error
- Check that all Google environment variables are set
- Make sure you shared your calendar with the service account

### "No available times"
- Check your Google Calendar - you might have events blocking all slots
- Verify working hours in `availability/route.ts`
- Make sure your calendar is in the correct timezone

### Webhook not working
- Verify webhook URL in Stripe Dashboard
- Check webhook secret is correct in environment variables
- Look at Stripe Dashboard → Webhooks → Events to see delivery status

### Booking created twice
- Check you're not running webhook tests in Stripe while also testing live

---

## 📧 Support

If you need help, check:
1. Browser console for errors
2. Vercel deployment logs
3. Stripe webhook delivery logs

---

**That's it! You now have a professional, payment-first booking system with no monthly fees!** 🎉

