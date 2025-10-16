# 🚀 Quick Start - Get Your Booking System Live in 45 Minutes

## ✅ What's Done

Your custom booking system is **100% coded and ready**. Just needs configuration!

---

## 📋 Setup Checklist

### □ Step 1: Google Calendar API (15 min)
1. Go to https://console.cloud.google.com
2. Create project: "Divine Consultation"
3. Enable Google Calendar API
4. Create Service Account
5. Download JSON key file
6. Share your calendar with service account email
7. Copy Calendar ID

**📖 Detailed guide:** See `SETUP_GUIDE.md` Section 1

---

### □ Step 2: Stripe Setup (10 min)
1. Go to https://dashboard.stripe.com
2. Toggle to "Test mode"
3. Get API keys (Publishable + Secret)
4. Save for later: Webhook setup (after deploy)

**📖 Detailed guide:** See `SETUP_GUIDE.md` Section 2

---

### □ Step 3: Environment Variables (5 min)
1. Create `.env.local` file in project root
2. Copy template from `ENV_SETUP.md`
3. Fill in your keys from Steps 1 & 2

**📖 Template:** See `ENV_SETUP.md`

---

### □ Step 4: Test Locally (5 min)
```bash
npm install
npm run dev
```

1. Go to http://localhost:3000/thank-you
2. Try booking a slot
3. Use test card: `4242 4242 4242 4242`
4. Check your Google Calendar!

---

### □ Step 5: Deploy to Vercel (10 min)
```bash
git add .
git commit -m "Add custom booking system"
git push origin main
```

1. Go to vercel.com
2. Import repository
3. Add all environment variables
4. Deploy!

---

### □ Step 6: Stripe Webhook (5 min)
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-site.vercel.app/api/webhooks/stripe`
3. Select event: `checkout.session.completed`
4. Copy webhook secret
5. Add to Vercel env vars: `STRIPE_WEBHOOK_SECRET`
6. Redeploy

---

## 🎯 You're Done!

Your booking system is live with:
- ✅ Real-time availability
- ✅ Payment BEFORE booking
- ✅ No ghost bookings
- ✅ No monthly fees
- ✅ Automatic Google Meet links
- ✅ Email confirmations
- ✅ Calendar reminders

---

## 📚 Need Help?

- **Full setup guide:** `SETUP_GUIDE.md`
- **Environment variables:** `ENV_SETUP.md`
- **System overview:** `BOOKING_SYSTEM_README.md`
- **Implementation details:** `IMPLEMENTATION_COMPLETE.md`

---

## 💡 Quick Tips

### Testing Stripe
- Test card: `4242 4242 4242 4242`
- Any future expiry
- Any 3-digit CVC

### Common Issues
- "Calendar not configured" → Check env vars
- "No available times" → Check working hours in code
- Webhook not working → Verify webhook secret

---

## 🎉 Benefits

| Before (Calendly) | After (Your System) |
|-------------------|---------------------|
| $16/month | **FREE** |
| Ghost bookings | **Payment first** |
| Lazy loading | **Instant** |
| Scroll issues | **Perfect mobile** |
| Limited control | **Full control** |

**Annual savings: $192!**

---

**Ready? Start with Step 1!** 🚀

