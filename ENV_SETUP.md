# Environment Variables Setup

Create a `.env.local` file in the project root with these variables:

```bash
# Stripe Keys (get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Calendar API (get from https://console.cloud.google.com)
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Consultation Settings
CONSULTATION_PRICE=4900
CONSULTATION_DURATION_MINUTES=60
CONSULTATION_TIMEZONE=America/New_York

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Setup Instructions:

### 1. Stripe Setup
1. Go to https://dashboard.stripe.com/register
2. Create account or login
3. Go to Developers → API Keys
4. Copy "Publishable key" → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Copy "Secret key" → `STRIPE_SECRET_KEY`
6. For webhook secret, we'll set this up after deploying

### 2. Google Calendar API Setup
1. Go to https://console.cloud.google.com
2. Create a new project (or select existing)
3. Enable Google Calendar API
4. Create Service Account:
   - Go to IAM & Admin → Service Accounts
   - Create Service Account
   - Download JSON key file
5. Copy from JSON:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`
6. Share your Google Calendar with the service account email
7. Copy your calendar ID → `GOOGLE_CALENDAR_ID`

### 3. Consultation Settings
- `CONSULTATION_PRICE`: Price in cents (4900 = $49.00)
- `CONSULTATION_DURATION_MINUTES`: How long each session lasts
- `CONSULTATION_TIMEZONE`: Your timezone

I'll guide you through each step!

