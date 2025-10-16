# 🧪 Testing Your Booking System

## ✅ Configuration Complete!

- ✅ Google Calendar API configured
- ✅ Stripe test keys added
- ✅ Environment variables set
- ✅ Dev server running

---

## 🚀 How to Test

### Step 1: Open the Site
Go to: **http://localhost:3000/thank-you**

### Step 2: Scroll to Booking Section
You'll see your custom booking calendar!

### Step 3: Select a Date
- Click on any date in the next 14 days
- You'll see available time slots (9 AM - 5 PM)

### Step 4: Select a Time
- Click on an available time slot
- You'll see the booking summary

### Step 5: Proceed to Payment
- Click "💳 Proceed to Payment"
- You'll be redirected to Stripe Checkout

### Step 6: Use Test Card
Use these test card details:
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **Email:** Your email (you'll get confirmation)

### Step 7: Complete Payment
- Click "Pay"
- You'll be redirected back to confirmation page

### Step 8: Check Your Calendar!
- Open Google Calendar (calendar.google.com)
- You should see the booking with:
  - ✅ Client name and email
  - ✅ Google Meet link
  - ✅ Payment status
  - ✅ Appointment details

---

## ✅ What Should Happen:

1. **Instant Availability** - No loading delay!
2. **Real-time Slots** - Only shows times you're available
3. **Smooth Payment** - Redirects to Stripe
4. **Automatic Booking** - Creates calendar event after payment
5. **Email Confirmation** - Sent to you and customer
6. **Google Meet Link** - Automatically created

---

## 🐛 Troubleshooting

### "No available times"
- **Cause:** Your calendar is fully booked for that day
- **Fix:** Try a different date or check your Google Calendar

### "Calendar not configured"
- **Cause:** Environment variables not loaded
- **Fix:** Restart dev server (`npm run dev`)

### "Failed to fetch availability"
- **Cause:** Google Calendar API issue
- **Fix:** Check that calendar is shared with service account email

### Payment doesn't create booking
- **Cause:** Webhook not configured (expected in local testing)
- **Fix:** This is normal! Webhook only works after deployment

---

## 📊 Expected Behavior

### ✅ Works Locally:
- Date selection
- Time slot display
- Stripe checkout redirect
- Payment processing

### ⚠️ Doesn't Work Locally:
- Webhook (creating booking after payment)
  - **Why:** Stripe can't reach localhost
  - **Solution:** Test this after deploying to Vercel

---

## 🎯 Test Checklist

- [ ] Calendar loads without delay
- [ ] Can select a date
- [ ] See available time slots
- [ ] Can select a time
- [ ] See booking summary ($49, 60 min)
- [ ] Click "Proceed to Payment"
- [ ] Redirected to Stripe
- [ ] Can enter test card info
- [ ] Payment processes
- [ ] Redirected to confirmation page

---

## 💡 Test Scenarios

### Scenario 1: Book Tomorrow at 2 PM
1. Select tomorrow's date
2. Click "2:00 PM" slot
3. Complete payment
4. Check calendar

### Scenario 2: Try Already Booked Time
1. Book a slot (Scenario 1)
2. Refresh page
3. Try to book same slot
4. Should not be available!

### Scenario 3: Check Email
1. Complete a test booking
2. Use your real email in Stripe
3. Check inbox (might take a few minutes)
4. Should receive Google Calendar invite

---

## 🎉 Success Criteria

Your system works if:
- ✅ Calendar displays instantly
- ✅ Shows real availability
- ✅ Payment redirect works
- ✅ Test payment succeeds
- ✅ Confirmation page shows

After deploying:
- ✅ Booking appears in Google Calendar
- ✅ Email confirmations sent
- ✅ Google Meet link created

---

## 📝 Notes

- **Test Mode:** No real charges
- **Live Mode:** Will charge real money (switch keys later)
- **Webhook:** Only works after deployment
- **Local Testing:** Limited to payment flow, not booking creation

---

## Next Steps After Testing

1. ✅ If everything works → Deploy to Vercel
2. ✅ Set up webhook on Vercel
3. ✅ Test with live keys
4. ✅ Go live!

---

**Currently testing at:** http://localhost:3000/thank-you

**Using:** Stripe Test Mode (safe, no real charges)

**Ready to test!** 🚀

