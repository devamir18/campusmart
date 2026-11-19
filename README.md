CampusMart

A campus marketplace that connects students with sellers. The platform acts as the middleman: students pay the platform, the payment is held safely until delivery is confirmed, and then the seller is paid minus a commission.

CampusMart is a working name. Replace it once the brand is decided.

Status: Planning and design (v0.1)

Table of contents
Overview
Features
How an order works
Tech stack
Project structure
Getting started
Environment variables
Scripts
Roadmap
Contributing
Author
License
Overview

Students often buy and sell through chat groups, where scams are common and orders are hard to track. CampusMart gives them one place to:

Buy textbooks, gadgets, food, campus services and hostel items from verified sellers
Pay safely, with money held in escrow until the order arrives
Let sellers manage listings, orders and earnings from a simple dashboard

The platform earns from a commission on each completed order and a delivery fee.

Features
Students
Browse and search listings by category
Product pages with photos, price, stock and seller details
Cart and checkout with online payment
Order tracking and delivery confirmation
Report a problem to open a dispute
Sellers
Overview with sales, orders and pending payout
Create, edit and remove listings, and mark items available or unavailable
Accept or decline orders and update their status
Earnings screen showing sales, platform fee and payout history
Store profile: hours, delivery options, pickup point and payout account
Mobile-first dashboard, with a sidebar and order board on large screens
Admin
Approve, reject and suspend sellers
View and filter all orders
Handle disputes and refunds
Track commission and trigger seller payouts
Manage categories and commission rates
How an order works
The student places an order and pays. The platform holds the payment.
The seller accepts or declines. A decline refunds the student.
The seller prepares the order and marks it ready.
The order is delivered or collected.
The student confirms delivery. The platform pays the seller minus commission.
If something goes wrong, the student opens a dispute and an admin decides.

Order statuses: Paid, Accepted, Preparing, Ready, Out for delivery, Delivered, Completed, Disputed, Refunded, Cancelled.

Tech stack
Layer	Technology
Front end	React, Next.js, Tailwind CSS
Back end	Node.js, Express
Database	PostgreSQL
Payments	Payment gateway with escrow support (to be chosen)
File storage	Cloud storage for product photos and logos
Email	Transactional email service
Project structure
campusmart/
├── client/                 # Next.js front end
│   ├── app/                # Pages and routes
│   ├── components/         # Reusable UI components
│   └── lib/                # API helpers and utilities
├── server/                 # Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Auth, roles, validation
│   │   └── services/       # Payments, email, payouts
│   └── package.json
├── docs/                   # Requirements, designs and notes
└── README.md

This is the planned layout and may change as the build progresses.

Getting started
Prerequisites
Node.js 18 or later
PostgreSQL 14 or later
npm or yarn
A payment gateway account (test mode)
Installation
bash
# 1. Clone the repository
git clone https://github.com/devamir18/campusmart.git
cd campusmart

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Set up environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env.local

# 4. Create the database and run migrations
cd ../server
npm run db:migrate

# 5. Start the API (in one terminal)
npm run dev

# 6. Start the front end (in a second terminal)
cd ../client
npm run dev

The front end runs at http://localhost:3000 and the API at http://localhost:5000.

Environment variables
Server (server/.env)
env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/campusmart
JWT_SECRET=replace-with-a-long-random-string
CLIENT_URL=http://localhost:3000

# Payments
PAYMENT_SECRET_KEY=your-gateway-secret-key
PAYMENT_WEBHOOK_SECRET=your-gateway-webhook-secret

# Commission and fees
COMMISSION_RATE=0.10
DELIVERY_FEE=0

# Email
EMAIL_API_KEY=your-email-service-key
EMAIL_FROM=no-reply@example.com

# File storage
STORAGE_BUCKET=your-bucket-name
STORAGE_KEY=your-storage-key
Client (client/.env.local)
env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_PAYMENT_PUBLIC_KEY=your-gateway-public-key

Never commit real keys. Add .env and .env.local to .gitignore.

Scripts
Command	What it does
npm run dev	Starts the app in development mode
npm run build	Builds for production
npm start	Runs the production build
npm run db:migrate	Runs database migrations
npm run lint	Checks code style
npm test	Runs tests
Roadmap
 Define concept, business model and requirements
 Design landing page and seller dashboard
 Design student and admin screens
 Database design
 Accounts and authentication
 Listings, cart and checkout
 Escrow payments, refunds and payouts
 Seller and admin dashboards
 Notifications
 Pilot launch on one campus
 Reviews and ratings
 Buyer and seller chat
 Seller subscriptions and promoted listings
Contributing
Fork the repository
Create a branch: git checkout -b feature/your-feature
Commit your changes: git commit -m "Add your feature"
Push the branch: git push origin feature/your-feature
Open a pull request
Author

Dev Amir (@devamir18)

