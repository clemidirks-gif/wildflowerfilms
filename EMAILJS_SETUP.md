# EmailJS Setup Guide - Wildflower Films Booking Form

This guide shows how to configure EmailJS so booking requests for **Wildflower Films** are emailed to you automatically. **No backend hosting required!**

## Step 1: Sign Up for EmailJS (Free)
1. Go to https://www.emailjs.com
2. Click "Sign Up"
3. Create a free account (no credit card needed)
4. Verify your email

## Step 2: Get Your Public Key
1. After login, go to **Account** (top right)
2. Copy your **Public Key** (you'll need this)
3. Open `index.html` and find this line:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY');
   ```
4. Replace `YOUR_PUBLIC_KEY` with your actual key

## Step 3: Create Email Service
1. Go to **Email Services** in the left sidebar
2. Click **Add Service**
3. Select **Gmail** (or your email provider)
4. Sign in and grant permissions
5. Save the service - you'll get a **Service ID** (looks like `service_xxxxxxxxxxxx`)

## Step 4: Create Email Template
1. Go to **Email Templates** in sidebar
2. Click **Create New Template**
3. Name it something like "11:11 Weddings Booking"
4. Replace the template content with:

```
Subject: New Booking for 11:11 Weddings from {{from_name}}

Hello,

You have a new wedding booking request!

BOOKING DETAILS:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Package: {{package}} ({{price}})
- Wedding Date: {{wedding_date}}
- Location: {{location}}
- Submitted: {{submitted_at}}

SPECIAL REQUESTS:
{{requests}}

---
Please contact them soon to confirm the booking for 11:11 Weddings.
```

5. Click **Save** - you'll get a **Template ID** (looks like `template_xxxxxxxxxxxx`)

## Step 5: Update Your Site
1. Open `11:11 Weddings.html`
2. Find this section at the bottom:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY');
   ```
   Replace with your actual public key

3. Open `script.js`
4. Find these lines in the booking form handler:
   ```javascript
   emailjs.send(
       'YOUR_SERVICE_ID',
       'YOUR_TEMPLATE_ID',
       {
           to_email: 'YOUR_EMAIL@example.com',
   ```

5. Replace with your actual values (amounts are in South African Rand - `R`):
   - `YOUR_SERVICE_ID` - Your service ID from Step 3
   - `YOUR_TEMPLATE_ID` - Your template ID from Step 4
   - `YOUR_EMAIL@example.com` - Your actual email address

## Step 6: Test It!
1. Open your website in a browser
2. Scroll to "Packages" section
3. Click "Book Now" on any package
4. Fill out the form and submit
5. You should receive an email!

## That's It!
Your booking form is now fully functional. No backend needed - emails will send directly from visitors' browsers to your email.

## Troubleshooting

**Not receiving emails?**
- Check spam/promotions folder
- Make sure Service ID and Template ID are correct
- Verify your Public Key is correct
- Check the browser console for errors (F12 → Console)

**Need help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- Support: support@emailjs.com
