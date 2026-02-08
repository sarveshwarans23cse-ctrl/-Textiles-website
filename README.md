# Sarees E-commerce Website

A modern, attractive e-commerce website for sarees and textiles built with Next.js 14.

## Features

- **Product Display**: Beautiful grid layout showing sarees with images, prices, and descriptions
- **Shopping Cart**: Add items directly from product display, manage quantities
- **Billing System**: Generate bills with QR code for payment, print functionality
- **Admin Panel**: 
  - Login with authentication
  - Full CRUD operations for products (Create, Read, Update, Delete)
  - Image upload for products
  - Monthly sales reports with charts
  - Export reports to CSV

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **Charts**: Recharts
- **Print**: react-to-print
- **Database**: JSON file storage (can be upgraded to database)

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
Create a `.env.local` file:
```
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default Admin Credentials

- **Username**: admin
- **Password**: admin123

**Important**: Change the default password after first login in production!

## Project Structure

```
├── app/
│   ├── (customer)/          # Customer-facing pages
│   │   ├── page.tsx         # Home page
│   │   └── cart/
│   │       └── page.tsx     # Shopping cart
│   ├── (admin)/             # Admin pages (protected)
│   │   ├── login/           # Admin login
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── menu/            # Menu management
│   │   └── reports/         # Sales reports
│   └── api/                 # API routes
├── components/              # React components
├── contexts/               # Context providers
├── lib/                    # Utilities and data
└── public/                 # Static files
    └── uploads/            # Product images
```

## Usage

### For Customers

1. Browse products on the home page
2. Click "Add to Cart" on any product
3. View cart by clicking the cart icon
4. Click "Pay Now" to generate bill
5. Print the bill or scan QR code for payment

### For Admins

1. Navigate to `/admin/login`
2. Login with admin credentials
3. **Manage Menu**: Add, edit, or delete products
4. **View Reports**: Check monthly sales with date filtering
5. Export reports to CSV

## Features in Detail

### Product Management
- Add products with image upload
- Edit existing products
- Delete products
- View all products in a table

### Sales Reports
- Filter by date range
- View total sales and order count
- Interactive charts showing sales trends
- Export to CSV

### Billing
- Automatic bill generation
- QR code for payment
- Print functionality
- Order tracking

## Development

### Adding New Products

1. Login as admin
2. Go to Menu Management
3. Click "Add New Product"
4. Fill in product details
5. Upload product image
6. Save

### Customizing

- **Colors**: Edit `tailwind.config.ts` to change color scheme
- **QR Code**: Replace the QR code component with your actual UPI/Bank QR code image
- **Styling**: Modify components in `components/` directory

## Production Deployment

1. Set proper `NEXTAUTH_SECRET` environment variable
2. Change default admin password
3. Build the project: `npm run build`
4. Start production server: `npm start`

## License

This project is private and proprietary.


# -Textiles-website