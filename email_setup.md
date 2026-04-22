# Email Setup Instructions for AgricWorld

## How to Setup Email Functionality

To make the contact form send emails to nganbewuborijaamos@gmail.com, follow these steps:

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- It's free for up to 200 emails/month

### 2. Get Your Public Key
- After signing up, go to Account > API
- Copy your **Public Key**

### 3. Create Email Service
- Go to EmailJS Dashboard > Email Services
- Click "Add Service"
- Choose "Gmail" or your email provider
- Follow the setup wizard
- Connect your email: nganbewuborijaamos@gmail.com
- Copy the **Service ID** (looks like: service_xxxxx)

### 4. Create Email Template
- Go to EmailJS Dashboard > Email Templates
- Click "Create New Template"
- Configure the template:
  - **To Email**: {{to_email}}
  - **Subject**: New Contact Form Message from {{from_name}}
  - **Template**:
  ```
  Name: {{from_name}}
  Email: {{from_email}}
  Phone: {{phone}}
  Message: {{message}}
  ```
- Save and copy the **Template ID** (looks like: template_xxxxx)

### 5. Update Your Code
In `js/script.js`, replace these lines (around line 26-27):

```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Replace with your Public Key
```

And in the `handleFormSubmit` function (around line 46), update:

```javascript
emailjs.send('service_YOUR_SERVICE_ID', 'template_YOUR_TEMPLATE_ID', templateParams)
```

Replace:
- `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key
- `service_YOUR_SERVICE_ID` with your service ID
- `template_YOUR_TEMPLATE_ID` with your template ID

### Example:
```javascript
emailjs.init('a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5');
emailjs.send('service_abc123def456', 'template_xyz789abc123', templateParams)
```

### 6. Test It
- Open your contact.html page
- Fill out the form
- Click "Send Message"
- Check your email inbox

That's it! Your contact form will now send emails directly to your inbox.