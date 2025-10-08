# Google Sheets Integration Setup

This guide will help you connect your divine consultation form to Google Sheets for lead collection.

## 📋 Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Divine Consultation Leads" (or any name you prefer)
4. Set up these column headers in row 1:
   - A1: `First Name`
   - B1: `Email` 
   - C1: `Date Submitted`
   - D1: `Status`

## 🔧 Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the content from `google-apps-script.js`
4. Replace `YOUR_SHEET_ID` with your actual Google Sheet ID
   - Find the Sheet ID in your Google Sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

## 🚀 Step 3: Deploy as Web App

1. In your Google Apps Script project, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set these options:
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the web app URL (you'll need this for your Next.js form)

## 🔗 Step 4: Update Your Next.js Form

1. Open `app/page.tsx`
2. Find the commented code in the `handleSubmit` function
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your actual web app URL
4. Uncomment the fetch code:

```javascript
await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', { 
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ firstName, email }) 
})
```

## ✅ Step 5: Test the Integration

1. Run your Next.js development server
2. Fill out the form with test data
3. Check your Google Sheet to see if the data appears
4. Verify the data includes first name, email, and timestamp

## 📊 What You'll Collect

Your Google Sheet will automatically collect:
- ✅ First Name
- ✅ Email Address  
- ✅ Date/Time submitted
- ✅ Status (set to "New" by default)

## 🎯 Next Steps

Once set up, you can:
- Export leads to CSV
- Set up email notifications for new leads
- Create automated follow-up sequences
- Track conversion metrics

## 🔒 Security Notes

- The web app is set to "Anyone" access but only accepts POST requests
- Data is stored securely in your Google account
- You can revoke access anytime in the Apps Script deployment settings
