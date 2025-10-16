# 🔗 Stripe Webhook Setup Guide

## Why You Need This

The webhook is what makes everything work automatically:
- ✅ Creates Google Calendar events after payment
- ✅ Sends email confirmations to client
- ✅ Sends booking notification to you
- ✅ Blocks the time slot from being booked again

Without the webhook, **none of this happens** - payments go through but nothing else triggers.

---

## 📋 Step-by-Step Setup

### 1. Get Your Webhook URL

Your webhook endpoint is:
```
https://divine-consultation-1wuasecot-hseinsbs-projects.vercel.app/api/webhooks/stripe
```

### 2. Add Webhook to Stripe Dashboard

1. **Go to:** https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"** button
3. **Endpoint URL:** Paste your webhook URL (above)
4. **Description:** (optional) "Consultation Booking Webhook"
5. **Events to send:** 
   - Click "Select events"
   - Search for `checkout.session.completed`
   - Check the box next to it
   - Click "Add events"
6. Click **"Add endpoint"**

### 3. Copy the Signing Secret

After creating the webhook, you'll see a page with:
- Webhook endpoint details
- **Signing secret** (starts with `whsec_...`)

Click **"Reveal"** and copy the entire secret.

### 4. Add to Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Click on your project (`divine-consultation`)
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. **Name:** `STRIPE_WEBHOOK_SECRET`
6. **Value:** Paste the `whsec_...` secret you copied
7. **Environment:** Select all (Production, Preview, Development)
8. Click **"Save"**

### 5. Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click the **•••** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (~1-2 minutes)

---

## ✅ Testing the Webhook

### Test a Booking:

1. Go to your live site
2. Book a consultation
3. Use test card: `4242 4242 4242 4242`
4. Complete payment

### What Should Happen:

1. ✅ Redirect to confirmation page
2. ✅ Google Calendar event created
3. ✅ Client receives calendar invitation email
4. ✅ You receive booking notification email
5. ✅ Time slot disappears from available slots

### If Something Fails:

Check webhook logs in Stripe:
1. Go to: https://dashboard.stripe.com/webhooks
2. Click on your webhook endpoint
3. View the **"Attempts"** tab
4. Look for any failed requests and error messages

---

## 🐛 Troubleshooting

### "Webhook signature verification failed"
- Make sure you added the correct `STRIPE_WEBHOOK_SECRET` to Vercel
- Make sure you redeployed after adding it

### "No events showing up"
- Check that you selected `checkout.session.completed` event
- Make sure the webhook URL is exactly correct (no trailing slash)

### "Calendar event not created"
- Check Vercel logs for errors
- Verify Google Calendar API credentials are correct
- Make sure Gmail API is enabled in Google Cloud Console

---

## 📧 Gmail API Setup (If Emails Not Working)

1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to **"APIs & Services"** → **"Library"**
4. Search for **"Gmail API"**
5. Click **"Enable"**
6. Go back and verify it's enabled in **"Enabled APIs & services"**

---

## 🎯 Current Status

- ✅ Payment redirect working
- ⏳ Webhook setup (you're doing this now)
- ⏳ Calendar events (will work after webhook)
- ⏳ Email notifications (will work after webhook + Gmail API)

Once you complete the webhook setup, **test again** and everything should work! 🚀

