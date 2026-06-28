# MittiMart - Frontend RBAC System

A **Role-Based Access Control (RBAC)** frontend implementation for MittiMart, a React + Vite + Tailwind CSS marketplace for Indian handmade crafts.

## Tech Stack

- **React 19** + **Vite 8**
- **React Router DOM v7** (client-side routing)
- **Tailwind CSS 3** (utility-first styling)
- **Framer Motion** (page transitions & animations)
- **Lucide React** (icons)
- **Context API** (auth, cart, wishlist, voice state management)
- **LocalStorage** (mock JWT authentication)

## Roles

| Role     | Description                          |
| -------- | ------------------------------------ |
| Guest    | Unauthenticated visitor              |
| Customer | Logged-in buyer                      |
| Seller   | Artisan / shop owner                 |
| Admin    | Platform administrator               |

## Route Access Matrix

| Route                  | Guest | Customer | Seller | Admin |
| ---------------------- | :---: | :------: | :----: | :---: |
| `/`                    |  ✅   |    ✅    |   ✅   |  ✅   |
| `/products`            |  ✅   |    ✅    |   ✅   |  ✅   |
| `/about`               |  ✅   |    ✅    |   ✅   |  ✅   |
| `/contact`             |  ✅   |    ✅    |   ✅   |  ✅   |
| `/product/:slug`       |  ✅   |    ✅    |   ✅   |  ✅   |
| `/artist/:slug`        |  ✅   |    ✅    |   ✅   |  ✅   |
| `/login` / `/register` |  ✅   |    ❌    |   ❌   |  ❌   |
| `/cart`                |  ❌   |    ✅    |   ❌   |  ❌   |
| `/wishlist`            |  ❌   |    ✅    |   ❌   |  ❌   |
| `/checkout`            |  ❌   |    ✅    |   ❌   |  ❌   |
| `/orders`              |  ❌   |    ✅    |   ✅   |  ✅   |
| `/profile`             |  ❌   |    ✅    |   ❌   |  ❌   |
| `/chat`                |  ❌   |    ✅    |   ❌   |  ❌   |
| `/seller/*`            |  ❌   |    ❌    |   ✅   |  ✅   |
| `/admin/*`             |  ❌   |    ❌    |   ❌   |  ✅   |
| `/403`                 |  ✅   |    ✅    |   ✅   |  ✅   |

## Project Structure

```
frontend/src/
├── auth/               # LocalStorage auth helpers (mock JWT)
│   └── authStorage.js
├── components/         # Reusable UI components
│   ├── Navbar.jsx          # Original navbar (legacy)
│   ├── RoleBasedNavbar.jsx # Role-aware navbar
│   ├── RoleBasedSidebar.jsx# Collapsible sidebar (Seller/Admin)
│   ├── PageShell.jsx       # Page layout wrapper
│   ├── PageTransition.jsx  # Framer motion transition
│   └── Loader.jsx          # Loading spinner
├── context/            # React Context providers
│   ├── AuthContext.jsx     # Auth state (login/logout/role)
│   ├── CartContext.jsx     # Shopping cart
│   ├── WishlistContext.jsx # Wishlist
│   └── VoiceContext.jsx    # Voice input
├── hooks/              # Custom React hooks
│   ├── useAuth.js         # Auth state & methods
│   ├── useRole.js         # Role detection helpers
│   └── usePermission.js   # Permission checking
├── layouts/            # Layout components
│   ├── PublicLayout.jsx   # Public pages wrapper
│   ├── CustomerLayout.jsx # Customer pages wrapper
│   ├── SellerLayout.jsx   # Seller pages + sidebar
│   └── AdminLayout.jsx    # Admin pages + sidebar
├── pages/              # Page components
│   ├── Home.jsx           # Landing page
│   ├── Auth.jsx           # Login / Register
│   ├── Cart.jsx           # Shopping cart
│   ├── Wishlist.jsx       # Wishlist
│   ├── Checkout.jsx       # Checkout flow
│   ├── Orders.jsx         # Order history
│   ├── Profile.jsx        # User profile
│   ├── Chat.jsx           # Support chat
│   ├── ProductDetails.jsx # Product detail view
│   ├── ArtistShop.jsx     # Artist storefront
│   ├── About.jsx          # About page
│   ├── Contact.jsx        # Contact page
│   ├── Notifications.jsx  # Notifications
│   ├── Tracking.jsx       # Order tracking
│   ├── UnauthorizedPage.jsx  # 403 page
│   ├── NotFoundPage.jsx      # 404 page
│   ├── SellerDashboard.jsx   # Seller dashboard
│   ├── SellerAddProduct.jsx  # Add product form
│   ├── SellerEditProduct.jsx # Edit product form
│   ├── SellerProducts.jsx    # Seller product list
│   ├── SellerOrders.jsx      # Seller order mgmt
│   ├── SellerMessages.jsx    # Seller inbox
│   ├── SellerAnalytics.jsx   # Seller analytics
│   ├── AdminDashboard.jsx    # Admin dashboard
│   ├── ManageUsers.jsx       # User management
│   ├── ManageSellers.jsx     # Seller management
│   ├── ManageProducts.jsx    # Product management
│   ├── AdminOrders.jsx       # Global orders
│   ├── Reports.jsx           # Reports
│   └── Settings.jsx          # Admin settings
├── permissions/         # RBAC permission config
│   └── permissions.js
├── routes/              # Route guard components
│   ├── ProtectedRoute.jsx   # Auth + role + permission guard
│   ├── RoleGuard.jsx        # Role-based guard
│   ├── PermissionGuard.jsx  # Permission-based guard
│   ├── RequireAuth.jsx      # Authentication guard
│   └── GuestRoute.jsx       # Redirects authenticated users
├── utils/              # Utility functions
│   └── navigation.js
├── data/               # Mock data
│   └── mockData.js
├── App.jsx             # Root component with route definitions
├── main.jsx            # Entry point with BrowserRouter
└── index.css           # Global styles & Tailwind imports
```

## Getting Started

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Authentication Flow

1. Visit `/login` or `/register`
2. Select a role (Customer / Seller / Admin)
3. Fill in name, email, and password
4. Submit — a mock JWT is created and stored in `localStorage`
5. You are redirected to your role's home page
6. The navbar updates to show role-specific navigation items
7. Protected routes are now accessible based on your role

## Permission System

Centralized in `src/permissions/permissions.js`:

```js
// Check if a role has a specific permission
hasPermission(role, PERMISSIONS.ADD_PRODUCT)

// Utility functions
canViewProducts(role)
canAddProduct(role)
canEditProduct(role)
canDeleteProduct(role)
canManageUsers(role)
canCheckout(role)
canViewAnalytics(role)
```

## Route Guards

| Component         | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `ProtectedRoute`  | Requires auth + optional role/permission   |
| `RoleGuard`       | Requires specific role(s)                  |
| `PermissionGuard` | Requires specific permission               |
| `RequireAuth`     | Requires any authenticated user            |
| `GuestRoute`      | Only accessible to unauthenticated users   |

## Backend Migration

The RBAC system is designed for easy backend integration:

1. Replace `authStorage.js` with real API calls
2. Update `AuthContext.jsx` to call your `/login` and `/register` endpoints
3. Replace the mock JWT with a real JWT from your Node.js + Express backend
4. The permission system, route guards, and layouts require **zero changes**

## Dev Server

The dev server runs at **http://localhost:5173/**