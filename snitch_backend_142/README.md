<div align="center">

<!-- Banner -->
<img src="./docs/banner.png" alt="Snitch — Premium Fashion E-Commerce" width="100%" />

<br />
<br />

# SNITCH

### *Where Fashion Meets Flawless Commerce*

<br />

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?style=flat-square&logo=razorpay&logoColor=white)](https://razorpay.com)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: ISC](https://img.shields.io/badge/License-ISC-8C6B4A?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Workflow](#-workflow)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Performance](#-performance)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)
- [Support](#-support)

---

## 🌟 Overview

**Snitch** is a full-stack, production-grade fashion e-commerce platform built for the modern web. It handles the complete commerce lifecycle — from seller onboarding and product publishing, to buyer discovery, cart management, and secure payment settlement — inside a single, cohesive application.

### Why Snitch?

Most e-commerce starter projects either lack a payment layer or treat authentication as an afterthought. Snitch is different. It was designed from the ground up with a **dual-role system** (buyers and sellers), a **variant-aware inventory model**, **Google OAuth** alongside traditional credential auth, and a fully integrated **Razorpay payment gateway** — all backed by a clean RESTful API and a React frontend with Redux state management.

Whether you are learning full-stack development, looking for a production reference architecture, or shipping a real storefront, Snitch gives you a battle-tested foundation to build on.

### What Problem It Solves

Building e-commerce from scratch is notoriously complex. You need to coordinate:

- **Authentication** (traditional + social login)
- **Product management** with image uploads and variant tracking
- **Real-time inventory** that decrements only after confirmed payment
- **Payment integration** with cryptographic signature verification
- **Role-based access control** that separates seller and buyer workflows

Snitch solves all of this in a single repository, with a clean architecture that keeps each concern properly isolated.

---

## 🚀 Demo

| | |
|---|---|
| 🌐 **Live Demo** | [https://snitch-6ohg.onrender.com/](https://snitch-6ohg.onrender.com/) |

> **Note**: The live demo uses Razorpay test mode. Use the test card `4111 1111 1111 1111` with any future expiry and CVV.

---

## ✨ Features

- ✅ **Dual-Role Authentication** — Separate flows for buyers and sellers, both supporting email/password and Google OAuth. Roles are enforced at the middleware level, not just the UI.

- ✅ **JWT-Based Session Management** — Stateless, cookie-delivered tokens with a 5-day expiry ensure sessions are portable across server restarts without a session store.

- ✅ **Product Variants** — Each product can hold multiple variants (e.g., size S/M/L or colour Red/Blue), each with its own images, price, and stock count. This mirrors how real fashion catalogs are structured.

- ✅ **CDN Image Uploads via ImageKit** — Product images are uploaded to ImageKit.io CDN directly from the backend using streamed memory buffers. No disk writes, no S3 bucket to configure.

- ✅ **Full-Text Product Search** — MongoDB Atlas text indexes power fast, case-insensitive search across product titles and descriptions via a single query parameter.

- ✅ **Smart Product Recommendations** — When a buyer views a product, the engine queries MongoDB's `$text` index to surface semantically related listings.

- ✅ **Cart with Inventory Guards** — Every cart mutation (add, increment, decrement, remove) checks live stock. You cannot add more items than what is in stock.

- ✅ **Razorpay Payment Integration** — The checkout flow creates a Razorpay order server-side, presents the native Razorpay checkout modal on the client, and verifies the HMAC-SHA256 signature server-side before marking the order as paid and decrementing stock.

- ✅ **Role-Based Route Protection** — Frontend routes use a `<Protected>` component that checks Redux auth state and the user's role before allowing navigation. Backend routes use `identifyUser` and `identifySeller` middleware for the same enforcement on the API layer.

- ✅ **Seller Dashboard** — Sellers have a dedicated dashboard to view their listings, manage variants, and track inventory, completely separate from the buyer-facing storefront.

- ✅ **Request Validation** — All incoming API requests are validated using `express-validator` before they ever reach controller logic, catching malformed data at the edge.

- ✅ **Luxury Design System** — The UI follows a curated *Luxury Cream* design language — Playfair Display for headings, Inter for body text, and a warm cream/beige palette that gives the storefront a premium editorial feel.

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router | 7 | Client-side routing |
| Redux Toolkit | 2 | Global state management |
| Axios | 1.x | HTTP client |
| TailwindCSS | 4.x | Utility-first styling |
| Vite | 8.x | Build tooling and dev server |
| react-razorpay | 3.x | Razorpay checkout integration |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 5.x | Web framework |
| Mongoose | 9.x | MongoDB ODM |
| Passport.js | 0.7 | OAuth strategy runner |
| passport-google-oauth20 | 2.x | Google OAuth 2.0 |
| jsonwebtoken | 9.x | JWT signing and verification |
| bcryptjs | 3.x | Password hashing |
| express-validator | 7.x | Request validation |
| multer | 2.x | Multipart file handling |
| morgan | 1.x | HTTP request logging |
| cookie-parser | 1.x | Cookie parsing middleware |

### Infrastructure and Services

| Service | Purpose |
|---|---|
| MongoDB Atlas | Hosted NoSQL database |
| ImageKit.io | CDN image hosting and delivery |
| Razorpay | Payment gateway (orders and verification) |
| Google Cloud | OAuth 2.0 identity provider |

---

## 🏗 Architecture

Snitch follows a layered, feature-organised architecture. The backend is a standard Express MVC, enhanced with a **DAO layer** for complex database queries and a **Services layer** for third-party integrations (payments, file storage). The frontend is a feature-sliced React application where each domain (auth, products, cart) is fully self-contained.

```mermaid
graph TD
    Browser["Browser - React + Redux"]
    Vite["Vite Dev Server"]
    ExpressServer["Express Server port 3000"]
    Middleware["Middleware Layer auth, cors, validation"]
    Controllers["Controllers auth / product / cart"]
    DAOLayer["DAO Layer cart.dao / product.dao"]
    Services["Services payment / storage"]
    MongoDB["MongoDB Atlas"]
    ImageKit["ImageKit CDN"]
    Razorpay["Razorpay API"]
    GoogleOAuth["Google OAuth 2.0"]

    Browser -->|HTTP / API calls| Vite
    Vite -->|Proxied in dev| ExpressServer
    ExpressServer --> Middleware
    Middleware --> Controllers
    Controllers --> DAOLayer
    Controllers --> Services
    DAOLayer --> MongoDB
    Services --> ImageKit
    Services --> Razorpay
    ExpressServer --> GoogleOAuth
    GoogleOAuth -->|Callback + JWT| Browser
```

### Application Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant API as Express API
    participant DB as MongoDB
    participant RZP as Razorpay
    participant IK as ImageKit

    B->>API: POST /api/auth/register
    API->>DB: Create user with hashed password
    API-->>B: JWT cookie + user object

    B->>API: POST /api/products multipart
    API->>IK: Upload images to CDN
    IK-->>API: Image URLs
    API->>DB: Save product with variant
    API-->>B: Product object

    B->>API: POST /api/cart/add/:productId/:variantId
    API->>DB: Check stock, update cart
    API-->>B: Success

    B->>API: POST /api/cart/payment/create/order
    API->>RZP: Create order amount in paise
    RZP-->>API: Order ID
    API->>DB: Save payment record pending
    API-->>B: Order ID for checkout

    B->>RZP: Open checkout modal
    RZP-->>B: payment_id + signature

    B->>API: POST /api/cart/payment/verify/order
    API->>API: HMAC-SHA256 signature verify
    API->>DB: Mark payment paid, decrement stock, clear cart
    API-->>B: Success
```

---

## 📁 Project Structure

```
snitch_backend_142/
│
├── README.md
│
├── docs/                               # Documentation assets (banner, screenshots)
│
├── Backend/                            # Express API server
│   ├── server.js                       # Entry point — connects DB, starts Express
│   ├── package.json
│   ├── .env                            # Environment secrets (never commit)
│   ├── .env.example                    # Template for required environment variables
│   │
│   ├── public/                         # Vite production build output (served by Express)
│   │   ├── index.html
│   │   ├── fashion-model.webp
│   │   ├── fashion-model-login.webp
│   │   └── assets/                     # Bundled JS/CSS chunks
│   │
│   └── src/
│       ├── app.js                      # Express app config, middleware, route mounting
│       │
│       ├── config/
│       │   ├── config.js               # Validated env var exports
│       │   └── database.js             # Mongoose connection helper
│       │
│       ├── controllers/
│       │   ├── auth.controller.js      # Register, login, getMe, Google OAuth callback
│       │   ├── product.controller.js   # Product CRUD + variant management
│       │   └── cart.controller.js      # Cart CRUD + payment lifecycle
│       │
│       ├── dao/                        # Data Access Objects — complex DB queries
│       │   ├── cart.dao.js             # Aggregated cart query with $lookup & population
│       │   └── product.dao.js          # Stock lookup helpers
│       │
│       ├── middlewares/
│       │   └── auth.middleware.js      # identifyUser / identifySeller JWT guards
│       │
│       ├── models/
│       │   ├── user.model.js           # User schema with bcrypt pre-save hook
│       │   ├── product.model.js        # Product schema with variants + $text index
│       │   ├── cart.model.js           # Cart schema with embedded line items
│       │   ├── payment.model.js        # Payment record with Razorpay fields
│       │   └── priceSchema.js          # Shared price sub-document (reused in variants)
│       │
│       ├── routes/
│       │   ├── auth.routes.js          # /api/auth — register, login, google OAuth
│       │   ├── product.routes.js       # /api/products — CRUD + search + variants
│       │   └── cart.routes.js          # /api/cart — cart ops + payment endpoints
│       │
│       ├── services/                   # Third-party integration wrappers
│       │   ├── storage.service.js      # ImageKit CDN upload (memory-buffered)
│       │   └── payment.service.js      # Razorpay order creation
│       │
│       └── validation/                 # express-validator rule chains
│           ├── auth.validator.js
│           ├── product.validator.js
│           └── cart.validator.js
│
└── Frontend/                           # React + Vite SPA
    ├── index.html                      # HTML shell — Vite entry point
    ├── vite.config.js                  # Vite config with API proxy to :3000
    ├── eslint.config.js                # ESLint rules
    ├── package.json
    ├── design.md                       # Design token spec — Luxury Cream palette
    │
    └── src/
        ├── main.jsx                    # React root, Redux Provider, RouterProvider
        │
        ├── app/
        │   ├── App.jsx                 # Root component — layout wrapper
        │   ├── App.css                 # Global base styles
        │   ├── AppRoutes.jsx           # Centralised route definitions
        │   └── app.store.js            # Redux store — auth, products, cart slices
        │
        └── features/                  # Feature-sliced architecture
            │
            ├── auth/
            │   ├── components/
            │   │   └── Protected.jsx   # Role-aware route guard component
            │   ├── hooks/
            │   │   └── useAuth.jsx     # Auth state hooks + form submission logic
            │   ├── pages/
            │   │   ├── Login.jsx
            │   │   └── Register.jsx
            │   ├── service/
            │   │   └── auth.api.js     # Axios calls to /api/auth
            │   └── state/
            │       └── auth.slice.js   # Redux auth slice (user, token, role)
            │
            ├── products/
            │   ├── components/
            │   │   ├── Navbar.jsx              # Global navigation bar
            │   │   ├── RecommendedProducts.jsx # Related products carousel
            │   │   └── SearchBar.jsx           # Full-text search input
            │   ├── hooks/
            │   │   └── useProduct.jsx          # Product fetching & state hooks
            │   ├── pages/
            │   │   ├── Home.jsx                # Product listing grid
            │   │   ├── ProductDetails.jsx      # Buyer product detail + variant picker
            │   │   ├── SellerProductDetails.jsx # Seller product detail + variant manager
            │   │   ├── CreateProduct.jsx       # New product form with image upload
            │   │   └── Dashboard.jsx           # Seller inventory dashboard
            │   ├── service/
            │   │   └── product.api.js          # Axios calls to /api/products
            │   └── state/
            │       └── product.slice.js        # Redux products slice
            │
            └── cart/
                ├── hook/
                │   └── useCart.js      # Cart operations hook (add, remove, qty)
                ├── pages/
                │   ├── Cart.jsx        # Cart review + Razorpay checkout trigger
                │   └── OrderSuccess.jsx # Post-payment confirmation screen
                ├── service/
                │   └── cart.api.js     # Axios calls to /api/cart
                └── state/
                    └── cart.slice.js   # Redux cart slice
```

---

## 📦 Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- A [MongoDB Atlas](https://cloud.mongodb.com) cluster (free tier works)
- A [Razorpay](https://razorpay.com) account in test mode
- An [ImageKit](https://imagekit.io) account
- A [Google Cloud](https://console.cloud.google.com) project with OAuth 2.0 credentials

---

### 1. Clone the Repository

```bash
git clone https://github.com/Adarsh8763/Backend_Cohort2.0.git
cd Backend_Cohort2.0/snitch_backend_142
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

### 4. Configure Environment Variables

```bash
# Inside Backend/
cp .env.example .env
```

Then edit `.env` and add your credentials as described below.
```

### 5. Set Up MongoDB

The MongoDB text index on `products` is created automatically when the server starts for the first time via Mongoose. You can verify it in MongoDB Atlas under **Database → Collections → Indexes**.

### 6. Run the Backend

```bash
cd Backend
npm run dev
# Server starts on http://localhost:3000
```

### 7. Run the Frontend

```bash
cd Frontend
npm run dev
# Vite dev server starts on http://localhost:5173
```

> **Note**: The Express backend serves the built frontend from `Backend/public` in production. During development, Vite runs independently and the Google OAuth callback is configured to redirect back to `http://localhost:5173`.

---

## 🔐 Environment Variables

Create a `.env` file in the `Backend/` directory with the following keys:

| Variable | Description | Example |
|---|---|---|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster0.mongodb.net/Snitch` |
| `JWT_SECRET` | Random 64-char hex string for signing JWTs | `fcf58c88a77f0583...` |
| `CLIENT_ID` | Google OAuth 2.0 Client ID | `123456789-abc.apps.googleusercontent.com` |
| `CLIENT_SECRET` | Google OAuth 2.0 Client Secret | `GOCSPX-xxxxxxxx` |
| `NODE_ENV` | Environment flag | `development` or `production` |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key | `private_xxx=` |
| `RAZORPAY_KEY_ID` | Razorpay API key ID | `rzp_test_xxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret | `xxxxxxxxxxxxxxxx` |

> [!CAUTION]
> Never commit your `.env` file. It is already listed in `.gitignore`. Rotate any credentials that are accidentally exposed immediately.

---

## 📖 Usage

### As a Buyer

1. **Register** at `/register` — choose the Buyer role and provide your full name, email, phone, and password. Or click **Continue with Google** for a one-click signup.
2. **Browse** the homepage at `/` — all published products appear in a grid. Use the search bar to filter by keyword.
3. **View a product** — click any card to open `/product/:productId`, browse the image gallery, select a variant, and see per-variant pricing.
4. **Add to cart** — select a variant and click Add to Cart. The cart icon in the navbar updates in real time.
5. **Checkout** — navigate to `/cart`, review your items, and click **Pay Now**. The Razorpay modal opens.
6. **Order confirmed** — you are redirected to `/order-success` and your cart is cleared automatically.

### As a Seller

1. **Register** at `/register` — toggle the **I am a seller** option during signup.
2. **Create a product** at `/seller/create-product` — upload images, set title, description, price, stock, and custom attributes.
3. **Add variants** — from the seller product detail page, add size or colour variants with separate images, prices, and stock counts.
4. **Manage inventory** at `/seller/dashboard` — view all your listings and their variant stock levels at a glance.

---

## 🔄 Workflow

Here is exactly what happens from the moment a buyer clicks **Pay Now** to order confirmation:

```
1. [Client]  Buyer clicks "Pay Now"
             ↓
2. [API]     POST /api/cart/payment/create/order
             → Fetches cart via DAO (populated, formatted, totalled)
             → Validates each item's stock against the database
             → Calls Razorpay API to create an order (amount in paise)
             → Saves a Payment document with status="pending"
             → Returns Razorpay order_id to the client
             ↓
3. [Client]  react-razorpay opens checkout modal with order_id
             Buyer completes payment (card / UPI / netbanking)
             Razorpay returns: razorpay_order_id, razorpay_payment_id, razorpay_signature
             ↓
4. [API]     POST /api/cart/payment/verify/order
             → Finds pending Payment document by order_id
             → Verifies HMAC-SHA256 signature using Razorpay key secret
             → On success: marks Payment status="paid"
             → Decrements variant stock for each ordered item
             → Clears the buyer's cart
             → Returns success response
             ↓
5. [Client]  Redirects to /order-success
```

> [!NOTE]
> Stock is only decremented **after** cryptographic payment verification. This prevents inventory loss from abandoned or failed checkouts.

---

## 📡 API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register a new user (buyer or seller) |
| `POST` | `/api/auth/login` | None | Login with email and password |
| `GET` | `/api/auth/get-me` | JWT | Retrieve the authenticated user's profile |
| `GET` | `/api/auth/google` | None | Initiate Google OAuth flow |
| `GET` | `/api/auth/google/callback` | OAuth | Google OAuth callback — issues JWT, redirects |

### Products — `/api/products`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/products` | Seller JWT | Create a new product with images (multipart) |
| `GET` | `/api/products` | None | List all products |
| `GET` | `/api/products/seller` | Seller JWT | List the authenticated seller's products |
| `GET` | `/api/products/search?search=query` | None | Full-text search across title and description |
| `GET` | `/api/products/details/:productId` | None | Get a single product with all its variants |
| `POST` | `/api/products/:productId/variants` | Seller JWT | Add a new variant to an existing product |
| `GET` | `/api/products/:productId/recommendation` | None | Get similar products via text index |

### Cart and Payments — `/api/cart`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/cart/add/:productId/:variantId` | User JWT | Add a product variant to the cart |
| `GET` | `/api/cart` | User JWT | Fetch the authenticated user's cart (populated) |
| `PATCH` | `/api/cart/quantity/increment/:productId/:variantId` | User JWT | Increment item quantity by 1 |
| `PATCH` | `/api/cart/quantity/decrement/:productId/:variantId` | User JWT | Decrement item quantity by 1 |
| `DELETE` | `/api/cart/item/:cartItemId` | User JWT | Remove a line item from the cart |
| `POST` | `/api/cart/payment/create/order` | User JWT | Create a Razorpay payment order |
| `POST` | `/api/cart/payment/verify/order` | User JWT | Verify Razorpay signature and confirm order |

---

## 📸 Screenshots

<details>
<summary><strong>Click to expand screenshots</strong></summary>

<br>

### 🏠 Home
<img src="docs/screenshots/home.png" alt="Home" width="900"/>

---

### 🔍 Product Details
<img src="docs/screenshots/product-detail.png" alt="Product Details" width="900"/>

---

### 🛒 Cart
<img src="docs/screenshots/cart.png" alt="Cart" width="900"/>

---

### 💳 Razorpay Checkout
<img src="docs/screenshots/checkout.png" alt="Checkout" width="900"/>

---

### ✅ Order Success
<img src="docs/screenshots/order-success.png" alt="Order Success" width="900"/>

---

### 📦 Seller Dashboard
<img src="docs/screenshots/seller-dashboard.png" alt="Seller Dashboard" width="900"/>

---

### ➕ Create Product
<img src="docs/screenshots/create-product.png" alt="Create Product" width="900"/>

---

### 🔐 Login
<img src="docs/screenshots/login.png" alt="Login" width="900"/>

---

### 🔐 Register
<img src="docs/screenshots/register.png" alt="Register" width="900"/>

</details>

---

## ⚡ Performance

- **Memory-buffered uploads** — Multer is configured with `memoryStorage()`, so product images are held in-process and streamed directly to ImageKit. No temp files are written to disk.
- **MongoDB text indexes** — Full-text search and product recommendations both leverage MongoDB's native `$text` index, avoiding expensive regex scans on large collections.
- **DAO layer aggregation** — Cart fetches use a dedicated DAO that runs a single aggregation pipeline with `$lookup` and population, eliminating N+1 query patterns.
- **Static file serving** — In production, Express serves the Vite build output from `Backend/public`, removing the need for a separate Nginx layer on simple deployments.
- **Redux state caching** — Product and cart data are cached in Redux slices, so navigating back to previously loaded pages does not trigger redundant API calls.

---

## 🔒 Security

| Concern | Approach |
|---|---|
| **Password storage** | bcryptjs with a work factor of 10 — passwords are never stored in plaintext |
| **Session management** | Stateless JWTs signed with a 256-bit secret, delivered via HTTP cookies |
| **Role enforcement** | `identifySeller` middleware re-queries the database to confirm role — a stolen buyer token cannot access seller routes |
| **Request validation** | `express-validator` rejects malformed requests before they reach controller logic |
| **Payment integrity** | Razorpay signatures are verified server-side using HMAC-SHA256 before any state mutation |
| **File size limits** | Multer enforces a 10 MB per-file limit and a maximum of 7 images per upload request |
| **Environment secrets** | All sensitive values live in `.env`, which is `.gitignore`'d and validated at startup — the server refuses to boot without required variables |
| **CORS** | Configured via the `cors` middleware (update `origin` to your production domain before deploying) |

> [!WARNING]
> The application is configured to allow requests only from the deployed frontend. If you deploy this project to a different domain, update the `origin` value in `src/app.js` accordingly.

---

## 🔮 Future Improvements

- **Order history** — persist completed orders as a first-class model separate from the payment record, with a dedicated history UI for buyers.
- **Product reviews and ratings** — let verified buyers leave reviews on products they have purchased.
- **Wishlists** — save products for later without committing to the cart.
- **Coupon codes** — seller-issued promotional codes applied at checkout before payment initiation.
- **Real-time inventory notifications** — notify buyers when a low-stock item they are viewing sells out, using WebSockets or Server-Sent Events.
- **Email notifications** — send order confirmation and shipping update emails using Nodemailer or Resend.
- **Admin panel** — a super-admin role for platform moderation, user management, and aggregate analytics.
- **Search filters** — filter products by price range, category, and variant attributes.
- **Cursor-based pagination** — replace full collection scans with efficient paginated queries for large catalogs.
- **Rate limiting** — add `express-rate-limit` to auth and payment endpoints to prevent brute-force and abuse.

---

## 🗺️ Roadmap

- [x] User registration and login with email and password
- [x] Google OAuth 2.0 integration
- [x] Role-based access control — buyer and seller
- [x] Product creation with multi-image CDN upload
- [x] Product variants with independent price and stock
- [x] Full-text product search
- [x] Product recommendations engine
- [x] Cart management with real-time stock guards
- [x] Razorpay payment integration with server-side verification
- [x] Automatic stock decrement post-payment confirmation
- [x] Seller dashboard
- [ ] Order history page for buyers
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Coupon and discount code system
- [ ] Email order confirmations
- [ ] Admin dashboard
- [ ] Advanced search filters
- [ ] Paginated product listings
- [ ] Rate limiting on sensitive routes

---

## 🤝 Contributing

Contributions are what make open source great. Any improvement — bug fix, new feature, or documentation update — is genuinely welcome.

### Getting Started

1. **Fork** the repository
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit with a clear message
   ```bash
   git commit -m "feat: add wishlist functionality"
   ```
4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch

### Guidelines

- Follow existing code style and folder conventions.
- Add validation for any new API endpoints using `express-validator`.
- Keep PRs focused — one concern per pull request.
- Update this README if your change affects setup, architecture, or available endpoints.

---

## 📄 License

Distributed under the **ISC License**. See [`LICENSE`](./LICENSE) for more information.

---

## 👤 Author

**Adarsh Kumar Kamal**

- GitHub: [@Adarsh8763](https://github.com/Adarsh8763)
- Built as part of a full-stack engineering cohort

---

## 🙏 Acknowledgements

- [Razorpay](https://razorpay.com) — for a developer-friendly Indian payments API with excellent documentation
- [ImageKit.io](https://imagekit.io) — for real-time image optimisation and global CDN delivery
- [MongoDB Atlas](https://cloud.mongodb.com) — for a generous free tier that makes cloud hosting trivial
- [Passport.js](http://www.passportjs.org) — for making OAuth strategies modular and composable
- [Vite](https://vitejs.dev) — for making the frontend development experience genuinely enjoyable
- The open-source community, whose libraries form the foundation of this project

---

## 💬 Support

If you run into a bug or have a question:

- 🐛 **Bug Reports** — [Open an issue](https://github.com/Adarsh8763/Backend_Cohort2.0/issues/new)
- 💡 **Feature Requests** — [Request a feature](https://github.com/Adarsh8763/Backend_Cohort2.0/issues/new)
- 📧 **Direct Contact** — Reach out via my GitHub profile: https://github.com/Adarsh8763

---

## ⭐ Star the Repository

If Snitch saved you hours of architecture decisions or helped you learn, consider dropping a star. It helps others discover the project and keeps the motivation going.

**[⭐ Star Backend_Cohort2.0 on GitHub](https://github.com/Adarsh8763/Backend_Cohort2.0/)**

---

<div align="center">

*Crafted with precision. Built for production.*

**SNITCH** — Premium Fashion E-Commerce Platform

<sub>© 2026 Adarsh. ISC License.</sub>

</div>
