# Booking System Features

## ✅ Custom Availability Schedule

Your availability is now set to:

- **Monday**: 7:00 PM - 11:59 PM
- **Tuesday**: 7:00 PM - 10:00 PM  
- **Wednesday**: 7:00 PM - 11:59 PM
- **Thursday**: 7:00 PM - 8:00 PM
- **Friday**: 7:00 PM - 11:59 PM
- **Saturday**: 2:00 PM - 11:59 PM
- **Sunday**: 2:00 PM - 11:59 PM

Time slots are generated in 60-minute increments within these hours.

---

## ✅ Automatic Slot Blocking

When a client books and pays:
1. The appointment is **immediately added to your Google Calendar**
2. That time slot is **automatically removed** from available times
3. No other clients can book the same slot

This happens in real-time - as soon as Stripe processes the payment, the webhook fires and creates the calendar event.

---

## ✅ Email Confirmations

### For the Client:
- **Google Calendar Invitation** is automatically sent when the booking is created
- Includes:
  - Appointment date & time
  - Google Meet link (auto-generated)
  - Reminders (1 day before + 1 hour before)
  - Add to Calendar button

### For You (Host):
- **Beautiful HTML email notification** sent to `NOTIFICATION_EMAIL`
- Includes:
  - Client name & email
  - Appointment time
  - Amount paid
  - Google Meet link
  - Confirmation that client received their invitation

---

## 🔧 Setup Required

### In your local `.env.local` file:
Add this line:
```bash
NOTIFICATION_EMAIL=hussein.sbeiti.wb@gmail.com
```

### On Vercel (Production):
Add the same environment variable:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Key**: `NOTIFICATION_EMAIL`
   - **Value**: `hussein.sbeiti.wb@gmail.com`
3. Redeploy

---

## 📧 Email Requirements

For the email notifications to work, you need to:

1. **Enable Gmail API** on your Google Cloud project:
   - Go to https://console.cloud.google.com
   - Select your project
   - Go to "APIs & Services" → "Library"
   - Search for "Gmail API"
   - Click "Enable"

2. **Update Service Account Permissions**:
   - The service account needs the Gmail send scope
   - This is automatically handled in the code

---

## 🧪 Testing Locally

1. Add `NOTIFICATION_EMAIL` to your `.env.local`
2. Restart your dev server:
   ```bash
   npm run dev
   ```
3. Make a test booking with Stripe test mode
4. Check your email for the notification!

---

## 🚀 How It All Works Together

```
Client Books → Stripe Payment → Webhook Fires
                                     ↓
                    ┌────────────────┴────────────────┐
                    ↓                                 ↓
          Google Calendar Event            Email Notifications
                    ↓                                 ↓
              Slot Blocked              Client + Host Notified
```

All of this happens automatically in the background. You don't need to do anything! 🎉

