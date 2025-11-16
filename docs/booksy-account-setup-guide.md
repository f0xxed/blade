# Booksy Business Account Setup Guide

**For:** Blade and Barrel Barbershop
**Platform:** Booksy (https://biz.booksy.com)
**Completion Target:** November 2025
**Estimated Time:** 2-3 hours total

---

## Quick Start: Step-by-Step Account Creation

### Step 1: Create Booksy Business Account (15 minutes)

1. Visit **https://biz.booksy.com/en-us**
2. Click **"Sign Up for Free"** or **"Get Started"**
3. Choose account type: **Business Owner**
4. Enter email address (recommend: business email from Blade and Barrel domain)
5. Create strong password (save in password manager)
6. Verify email address (check inbox for confirmation link)

### Step 2: Business Information (15 minutes)

Enter the following details:

**Basic Information:**
- Business Name: **Blade and Barrel**
- Business Category: **Barbershop** (search and select)
- Location: **Tampa, Florida, USA**
- Address: (Street address - to be provided by Rich)
- Phone: (Business phone number - to be provided by Rich)
- Website: **https://bladeandbarrel.com** (our Vite site)
- Email: (Business email address)

**Business Hours:**
- Monday: 10:00 AM - 7:00 PM (confirm with Rich)
- Tuesday: 10:00 AM - 7:00 PM
- Wednesday: 10:00 AM - 7:00 PM
- Thursday: 10:00 AM - 7:00 PM
- Friday: 10:00 AM - 7:00 PM
- Saturday: 10:00 AM - 6:00 PM
- Sunday: Closed

**About the Business:**
- Brief description: "Blade and Barrel is a modern industrial-rustic barbershop located in Tampa's Channelside district, specializing in precision haircuts, beard grooming, and classic hot towel shaves."

### Step 3: Add Staff/Barber Profiles (30-45 minutes)

For each of the 8 barbers, add:

**Example Barber Profile:**
```
Name: [Barber Name]
Specialty: [e.g., "Fades", "Beard Work", "Kids Cuts"]
Email: [Barber email if available, or business email]
Phone: [Optional]
Bio: [Optional - e.g., "Expert in classic barbershop techniques"]
Profile Photo: [Barber headshot if available]
```

**Availability Schedule:**
- Set availability for each barber (e.g., 10 AM - 7 PM, Mon-Fri; 10 AM - 6 PM Saturday)
- Booksy will use this to show available time slots on the booking widget

**Repeat for all 8 barbers:**
1. Barber #1: [Name]
2. Barber #2: [Name]
3. Barber #3: [Name]
4. Barber #4: [Name]
5. Barber #5: [Name]
6. Barber #6: [Name]
7. Barber #7: [Name]
8. Barber #8: [Name]

### Step 4: Configure Services (30-45 minutes)

Add each service with pricing, duration, and which barbers offer it:

#### Service 1: Haircut
- Name: **Haircut**
- Description: "Classic haircut with blade and scissors"
- Duration: **45 minutes**
- Price: **$35.00**
- Available to: **All Barbers**

#### Service 2: Beard Trim
- Name: **Beard Trim**
- Description: "Professional beard grooming and shaping"
- Duration: **30 minutes**
- Price: **$25.00**
- Available to: **All Barbers**

#### Service 3: Hot Towel Shave
- Name: **Hot Towel Shave**
- Description: "Classic straight razor shave with hot towel treatment"
- Duration: **60 minutes**
- Price: **$45.00**
- Available to: **(Select barbers experienced in shaving)**

#### Service 4: Line Up
- Name: **Line Up**
- Description: "Edge detail and line work"
- Duration: **15 minutes**
- Price: **$10.00**
- Available to: **All Barbers**

#### Service 5: Fade
- Name: **Fade**
- Description: "Fade haircut with precision tapering"
- Duration: **45 minutes**
- Price: **$40.00**
- Available to: **All Barbers**

#### Service 6: Shape Up
- Name: **Shape Up**
- Description: "Detailed shape work and edge grooming"
- Duration: **20 minutes**
- Price: **$15.00**
- Available to: **All Barbers**

#### Service 7: Haircut + Beard Combo
- Name: **Haircut + Beard**
- Description: "Full haircut plus beard trim (combo service)"
- Duration: **75 minutes**
- Price: **$50.00**
- Available to: **All Barbers**

#### Service 8: Kids' Haircut
- Name: **Kids' Haircut**
- Description: "Haircut for children under 12"
- Duration: **30 minutes**
- Price: **$25.00**
- Available to: **(Select barbers good with children)**

**Notes:**
- Booksy allows photos for each service (optional but recommended)
- Add detailed descriptions to help customers understand differences
- Consider adding "Buffer time" between appointments (e.g., 10-15 minutes for cleanup)
- Booksy calculates available slots based on service duration + buffer time

### Step 5: Set Payment Method (10 minutes)

1. Navigate to **Settings > Billing** or **Account > Payment Method**
2. Add credit card for monthly subscription billing
3. Booksy will charge:
   - Base: $29.99/month
   - Additional staff: $20/user/month (7 extra users × $20 = $140/month)
   - Total: ~$170/month
4. Confirm billing address

### Step 6: Configure Booking Rules & Policies (10 minutes)

1. **Cancellation Policy:**
   - "Cancellations must be made 24 hours in advance"
   - "Late cancellations may result in service fees"

2. **No-Show Policy:**
   - "No-shows will be charged the full service price"

3. **Confirmation Settings:**
   - Enable automatic confirmation emails
   - Enable appointment reminders (email and/or SMS)
   - Reminder timing: 24 hours before appointment

4. **Booking Buffer:**
   - Set minimum booking window: "Next available: Today at 10 AM" (customize as needed)
   - Set advance booking window: "Up to 90 days ahead"

### Step 7: Customize Booking Widget (Optional - 15 minutes)

1. Go to **Settings > Customization** or **Appearance**
2. Choose color scheme matching Blade and Barrel branding:
   - Primary color: **#B85C3C** (Burnt Orange)
   - Accent color: **#B8935E** (Brass/Gold)
   - Text color: **#1A1A1A** (Charcoal)
3. Upload logo if available
4. Customize welcome message: "Book your appointment at Blade and Barrel"

### Step 8: Enable Integrations & Get Widget Code (15 minutes)

1. Navigate to **Settings > Integrations** or **Embed Widget**
2. Click **"Get Embed Code"** or **"Integration Code"**
3. Copy the iframe embed code:
   ```html
   <iframe
     src="https://booksy.com/en-us/[BUSINESS_ID]"
     width="100%"
     height="800"
     frameborder="0"
     scrolling="yes">
   </iframe>
   ```
4. Save this code - you'll need it for Story 3.2 (React component)
5. Optional: Get API key if available for future custom integration needs

### Step 9: Send Access to Business Owner (5 minutes)

1. Go to **Settings > Team & Permissions**
2. Click **"Add Team Member"** or **"Invite Staff"**
3. Add Rich (business owner) with **Admin** role
4. Send invitation link via email
5. Rich accepts invitation and gains access to dashboard

### Step 10: Test Booking Flow (20 minutes)

1. From your Booksy dashboard, click **"Preview Booking Widget"** or **"View Public Page"**
2. Test complete booking flow on multiple devices:
   - **Desktop:** Chrome, Safari, Firefox
   - **Tablet:** iPad (Safari) or Android tablet
   - **Mobile:** iPhone (Safari), Android (Chrome)
3. Document any issues or questions
4. Verify services, barbers, and availability display correctly

---

## What You'll Get

After completing account setup, you'll have:

### ✅ Booksy Business Account
- Active subscription ($170/month)
- Business profile with all services
- 8 barber staff members configured
- Booking widget ready to embed

### ✅ Widget Embed Code
```html
<iframe
  src="https://booksy.com/en-us/[YOUR_BUSINESS_ID]"
  width="100%"
  height="800"
  frameborder="0">
</iframe>
```

### ✅ Public Booksy Business Page
- URL: `https://booksy.com/en-us/[YOUR_BUSINESS_ID]`
- Can be shared directly with customers
- Shows services, barbers, ratings, and booking link

### ✅ Dashboard Access
- View all bookings
- Manage barber schedules
- Respond to customer inquiries
- View analytics on booking trends

### ✅ Mobile Apps
- Barbers can check schedule from iOS/Android app
- Business owner can manage appointments on the go

---

## Environment Variables to Update

After setup, update `.env.local` with:

```bash
VITE_BOOKING_PLATFORM=booksy
VITE_BOOKSY_BUSINESS_ID=[YOUR_BUSINESS_ID_FROM_BOOKSY]
VITE_BOOKSY_BOOKING_URL=https://booksy.com/en-us/[YOUR_BUSINESS_ID]
VITE_BOOKSY_ENABLE_ANALYTICS=true
```

Example (hypothetical):
```bash
VITE_BOOKSY_BUSINESS_ID=12345678
VITE_BOOKSY_BOOKING_URL=https://booksy.com/en-us/12345678
```

---

## Troubleshooting

### Issue: Business category not showing "Barbershop"
**Solution:**
1. Search for "Barbershop" or "Barber Shop" in category list
2. If not available, use "Hair Salon" as closest match
3. Contact Booksy support if issues persist

### Issue: Can't add more than 8 staff members
**Solution:**
- Booksy allows unlimited staff with the Pro plan ($29.99 base + $20/user)
- Confirm staff members are being added correctly
- Contact Booksy support if you hit unexpected limits

### Issue: Widget preview not loading
**Solution:**
1. Clear browser cache and refresh
2. Check that all required business info is completed
3. Verify internet connection
4. Try different browser (Chrome, Safari, Firefox)
5. Contact Booksy support with account details

### Issue: Services not showing in booking widget
**Solution:**
1. Verify services are set to "Active" or "Enabled"
2. Ensure at least one barber is assigned to each service
3. Check barber availability overlaps with business hours
4. Clear widget preview cache and refresh

---

## Next Steps (Story 3.2)

Once account is created and credentials obtained:

1. **Add React Component** (`src/components/BookingWidgetWrapper.tsx`)
2. **Implement Analytics** (track `booking_initiated` event)
3. **Style & Responsive Design** (mobile-first optimization)
4. **Test on Real Devices** (iPhone, Android)
5. **Deploy to Staging** and verify functionality
6. **Launch to Production**

---

## Support Resources

- **Booksy Help Center:** https://help.booksy.com/
- **Booksy Barber Resources:** https://biz.booksy.com/en-us/who-loves-us/barber
- **Email Support:** support@booksy.com
- **Phone Support:** 24/7 (number available in help center)
- **Live Chat:** Available in Booksy Biz dashboard

---

## Account Checklist

- [ ] Booksy business account created
- [ ] Business information entered (name, location, hours, contact)
- [ ] All 8 barber profiles created with photos and availability
- [ ] All 8 services configured with pricing and duration
- [ ] Payment method added for subscription billing
- [ ] Booking policies configured
- [ ] Widget customization completed (optional)
- [ ] Widget embed code obtained and saved
- [ ] Business owner (Rich) invited and has access
- [ ] Test booking completed on multiple devices
- [ ] Environment variables updated in `.env.local`
- [ ] Documentation saved for Story 3.2 implementation

---

**Status:** Ready to begin account setup
**Estimated Completion:** 2-3 hours
**Next Milestone:** Story 3.2 - React Integration
