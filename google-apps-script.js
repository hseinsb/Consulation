// Google Apps Script for Divine Consultation Form
// This script will receive form data and save it to Google Sheets

// 1. Create a new Google Sheet with these column headers in row 1:
//    A1: "First Name" | B1: "Email" | C1: "Date Submitted" | D1: "Status"

// 2. Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
// 3. Deploy this as a web app with execute permissions set to "Anyone"

/**
 * Handle GET requests (receives form data via URL parameters)
 */
function doGet(e) {
  try {
    // Log incoming request
    console.log('doGet called with parameters:', e.parameter);
    
    // Check if parameters are provided
    if (e.parameter && e.parameter.firstName && e.parameter.email) {
      const firstName = e.parameter.firstName;
      const email = e.parameter.email;
      
      console.log('Processing submission:', firstName, email);
      
      // Get the spreadsheet
      const sheet = SpreadsheetApp.openById('1Wziz3UQl0N9gdAgfDONk7rinrrl4y5roBvehPUKx_fc').getActiveSheet();
      console.log('Sheet accessed:', sheet.getName());
      
      // Add the data to the sheet
      const timestamp = new Date();
      sheet.appendRow([firstName, email, timestamp, 'New']);
      console.log('Row appended successfully');
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Data saved successfully',
          data: { firstName, email, timestamp: timestamp.toISOString() }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // If no parameters, return API status
    console.log('No parameters provided, returning status');
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Divine Consultation API is running',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doGet:', error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString(),
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const { firstName, email } = data;
    
    // Get the spreadsheet
    const sheet = SpreadsheetApp.openById('1Wziz3UQl0N9gdAgfDONk7rinrrl4y5roBvehPUKx_fc').getActiveSheet();
    
    // Add the data to the sheet
    const timestamp = new Date();
    sheet.appendRow([firstName, email, timestamp, 'New']);
    
    // Send success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Send error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to test the script
function testScript() {
  const testData = {
    firstName: "Test User",
    email: "test@example.com"
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  console.log(result.getContent());
}

// Test function to verify sheet access
function testSheetAccess() {
  try {
    const sheet = SpreadsheetApp.openById('1Wziz3UQl0N9gdAgfDONk7rinrrl4y5roBvehPUKx_fc').getActiveSheet();
    const lastRow = sheet.getLastRow();
    console.log('Sheet access successful! Last row: ' + lastRow);
    console.log('Sheet name: ' + sheet.getName());
    
    // Try to add a test row
    const timestamp = new Date();
    sheet.appendRow(['TEST', 'test@test.com', timestamp, 'Test']);
    console.log('Test row added successfully!');
    
    return 'SUCCESS: Sheet access working';
  } catch (error) {
    console.error('ERROR: ' + error.toString());
    return 'ERROR: ' + error.toString();
  }
}

// Instructions for setup:
/*
1. Go to https://script.google.com/
2. Create a new project
3. Replace the default code with this script
4. Create a Google Sheet with headers: First Name, Email, Date Submitted, Status
5. Copy the Sheet ID from the URL and replace 'YOUR_SHEET_ID'
6. Save the script
7. Deploy as web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as type
   - Execute as "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
8. Copy the web app URL
9. Update your Next.js form to use this URL
*/
