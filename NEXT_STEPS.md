# ✅ Google Calendar Configured! Next Steps:

## What's Done:

✅ Google Calendar API set up
✅ Service account created
✅ Calendar shared with service account
✅ `.env.local` file created with your Google credentials
✅ Timezone set to America/Toronto

---

## 🔑 What You Need Now: Stripe Keys

### Step 1: Get Stripe Keys (5 minutes)

1. **Go to Stripe Dashboard:**
   - Visit: https://dashboard.stripe.com
   - Sign in or create account

2. **Toggle to Test Mode:**
   - Top right corner, switch to "Test mode"

3. **Get API Keys:**
   - Go to: Developers → API keys
   - Copy these two keys:
     - **Publishable key** (starts with `pk_test_`)
     - **Secret key** (starts with `sk_test_`)

4. **Add to `.env.local`:**
   - Open `.env.local` file in your project
   - Replace `pk_test_YOUR_KEY_HERE` with your actual publishable key
   - Replace `sk_test_YOUR_KEY_HERE` with your actual secret key

---

## 🧪 Test Locally (5 minutes)

Once you've added Stripe keys:

```bash
npm run dev
```

1. Go to: http://localhost:3000/thank-you
2. Scroll to booking section
3. Select a date
4. Select a time
5. Click "Proceed to Payment"
6. Use test card: **4242 4242 4242 4242**
7. Any future expiry date
8. Any 3-digit CVC
9. Complete payment

**Check your Google Calendar** - you should see the booking! 🎉

---

## 📝 Your `.env.local` File Status:

```
✅ GOOGLE_CLIENT_EMAIL - Configured
✅ GOOGLE_PRIVATE_KEY - Configured  
✅ GOOGLE_CALENDAR_ID - Configured (hussein.sbeiti.wb@gmail.com)
✅ CONSULTATION_PRICE - Set to $49.00
✅ CONSULTATION_DURATION_MINUTES - Set to 60 minutes
✅ CONSULTATION_TIMEZONE - Set to America/Toronto

⚠️ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY - NEEDS YOUR KEY
⚠️ STRIPE_SECRET_KEY - NEEDS YOUR KEY
⚠️ STRIPE_WEBHOOK_SECRET - Will set up after deploy
```

---

## 🚀 After Testing Works:

### Deploy to Vercel:

```bash
git add .
git commit -m "Add custom booking system with Google Calendar + Stripe"
git push origin main
```

Then:
1. Go to vercel.com
2. Import your repository
3. Add ALL environment variables (copy from `.env.local`)
4. Deploy!

### Set up Stripe Webhook:
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-site.vercel.app/api/webhooks/stripe`
3. Select event: `checkout.session.completed`
4. Copy webhook secret
5. Add to Vercel: `STRIPE_WEBHOOK_SECRET`
6. Redeploy

---

## 🎯 Current Status:

- ✅ Code: 100% complete
- ✅ Google Calendar: Configured
- ⚠️ Stripe: Needs keys
- ⏳ Testing: Ready once Stripe keys added
- ⏳ Deploy: Ready after testing

---

## 💡 Quick Reference:

**Test Card:** 4242 4242 4242 4242
**Calendar ID:** hussein.sbeiti.wb@gmail.com
**Service Account:** divine-consultation@divine-consultation.iam.gserviceaccount.com
**Timezone:** America/Toronto
**Price:** $49.00
**Duration:** 60 minutes

---

**Next: Add your Stripe keys to `.env.local` and test!** 🚀

