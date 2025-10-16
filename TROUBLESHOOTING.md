# 🔧 Troubleshooting Guide

## Common Issues After Deployment

### 1. "Failed to load available times" or API 500 Error

**Cause:** Environment variables not set correctly in Vercel

**Fix:**
1. Go to Vercel project → Settings → Environment Variables
2. Make sure ALL these are set:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (with quotes and `\n` characters!)
   - `GOOGLE_CALENDAR_ID`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `CONSULTATION_PRICE`
   - `CONSULTATION_DURATION_MINUTES`
   - `CONSULTATION_TIMEZONE`
   - `NEXT_PUBLIC_SITE_URL`
3. **Redeploy** after adding/updating variables

---

### 2. React Hydration Error (#423)

**Error:** `Uncaught Error: Minified React error #423`

**Cause:** Minor React hydration mismatch (cosmetic, doesn't affect functionality)

**Fix:** Can be ignored if booking works. If it bothers you:
1. Clear browser cache
2. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
3. Try incognito/private mode

---

### 3. Google Calendar Events Not Creating

**Cause:** Webhook not set up or incorrect

**Fix:**
1. Check Stripe Dashboard → Webhooks → Your endpoint
2. Look at "Recent deliveries" tab
3. See if webhook is being called
4. Check response - should be 200 OK
5. If 500 error, check Vercel logs

**Check Vercel Logs:**
1. Go to your Vercel project
2. Click "Logs" tab
3. Look for webhook errors
4. Usually shows Google Calendar API errors

---

### 4. "GOOGLE_PRIVATE_KEY" Issues

**Symptoms:**
- API returns "Calendar not configured"
- Webhook fails to create event

**Fix:**
Make sure `GOOGLE_PRIVATE_KEY` is formatted correctly:
```bash
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADAN...REST_OF_KEY...\n-----END PRIVATE KEY-----\n"
```

**Important:**
- Keep the quotes around it
- Include all `\n` characters
- Don't add extra spaces or line breaks
- Copy EXACTLY from the JSON file

---

### 5. No Email Confirmations

**Cause:** Calendar event not created (see #3)

**Once calendar event IS created:**
- Emails are automatic from Google Calendar
- Check spam folder
- Wait 1-2 minutes (can be delayed)

---

### 6. Payments Work But No Booking

**Cause:** Webhook secret incorrect

**Fix:**
1. Go to Stripe → Webhooks → Your endpoint
2. Click "Reveal" signing secret
3. Copy the `whsec_...` value
4. Update in Vercel: `STRIPE_WEBHOOK_SECRET`
5. Redeploy

---

### 7. Wrong Timezone

**Symptoms:** Events show at wrong time

**Fix:**
Update in Vercel:
```bash
CONSULTATION_TIMEZONE=America/New_York  # Or your timezone
```

Find your timezone: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

---

### 8. No Available Time Slots

**Cause:** Your Google Calendar is fully booked

**Fix:**
1. Check your Google Calendar
2. Make sure you have free slots during 9 AM - 5 PM
3. Or update working hours in `app/api/availability/route.ts`

---

### 9. Webhook Not Receiving Events

**Symptoms:** Payment succeeds but no calendar event

**Check:**
1. Webhook URL is correct: `https://YOUR-SITE.vercel.app/api/webhooks/stripe`
2. Event selected: `checkout.session.completed`
3. Webhook is in same mode as keys (test/live)

**Test Webhook:**
1. Go to Stripe → Webhooks → Your endpoint
2. Click "Send test webhook"
3. Select `checkout.session.completed`
4. Check Vercel logs for errors

---

### 10. Build/Deploy Fails

**Error:** "Failed to collect page data"

**Cause:** Environment variables not set during build

**Fix:**
1. Add all environment variables BEFORE deploying
2. If already deployed, add missing variables
3. Trigger a new deployment (Deployments → Redeploy)

---

## 🔍 How to Debug

### Check Vercel Logs:
1. Go to your project on Vercel
2. Click "Logs" tab
3. Filter by "Errors" or search for your route
4. Look for error messages

### Check Stripe Webhook Logs:
1. Stripe Dashboard → Webhooks
2. Click on your endpoint
3. "Recent deliveries" tab
4. Click on individual events to see request/response

### Check Browser Console:
1. F12 → Console tab
2. Look for API errors
3. Check Network tab for failed requests

---

## ✅ How to Know Everything Works

Test checklist:
- [ ] Can select date and time
- [ ] Payment redirects to Stripe
- [ ] Payment processes successfully
- [ ] Redirects to confirmation page
- [ ] Event appears in Google Calendar (within 1 minute)
- [ ] Email received (check spam, wait 1-2 min)
- [ ] Google Meet link created
- [ ] Customer name/email in event

---

## 🆘 Still Having Issues?

1. Check Vercel deployment logs
2. Check Stripe webhook logs
3. Verify all environment variables
4. Make sure calendar is shared with service account
5. Try test mode first before live mode

---

## 📝 Quick Checklist

Before asking for help, verify:
- [ ] All environment variables added to Vercel
- [ ] Webhook created in Stripe
- [ ] Webhook secret added to Vercel
- [ ] Redeployed after adding variables
- [ ] Calendar shared with service account email
- [ ] Using correct mode (test vs live) for all keys

---

**Most common issue:** Forgetting to redeploy after adding environment variables!

**Second most common:** `GOOGLE_PRIVATE_KEY` not formatted correctly (missing quotes or `\n`)

