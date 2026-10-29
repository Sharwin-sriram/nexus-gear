# NEXUS GEAR - Full-Stack E-Commerce Web Application
**22UIT501 - Web Programming Assignment – II**

An intuitive, modern, responsive full-stack e-commerce web application engineered with **React.js**, **CSS3**, **HTML5**, **Java Spring Boot**, and **PostgreSQL**.

---

## 📁 Project Structure

```
WP ASS/
├── NEXUS_GEAR_Web_Programming_Assignment_II.pdf   # Generated assignment PDF with identical neat borders
├── demo/
│   └── index.html                                  # Standalone interactive full-stack UI simulation
├── screenshots/                                    # High-resolution rendered preview images
│   ├── 1_home_page.png
│   ├── 2_product_search.png
│   ├── 3_shopping_cart.png
│   └── 4_order_confirmation.png
├── frontend/
│   └── src/
│       ├── App.jsx                                 # Core React application logic & state
│       ├── App.css                                 # Modern dark-mode styling & responsiveness
│       └── components/
│           ├── AuthModal.jsx                       # Customer Sign In / Register dialog
│           ├── ProductCard.jsx                     # Interactive product card with wishlist & badge
│           └── CartDrawer.jsx                      # Slide-out shopping cart with promo code
├── backend/
│   └── src/main/java/com/nexusgear/
│       ├── controller/
│       │   ├── ProductController.java              # REST endpoints for product catalog & search
│       │   ├── AuthController.java                 # Authentication & user profile endpoints
│       │   └── OrderController.java                # Checkout & order tracking endpoints
│       └── model/
│           ├── Product.java                        # JPA entity for product records
│           ├── User.java                           # JPA entity for user accounts
│           └── Order.java                          # JPA entity for orders and order items
└── generate_pdf.js                                 # Automated PDF compilation script with page borders
```

---

## 🚀 Key Features

1. **Product Listings & Catalog Management**: Official tech gear categorized into Audio, Keyboards & Mice, Wearables, and Power Accessories.
2. **Real-Time Live Search & Sorting**: Instant filtering by keywords and sorting by popularity, price (low-to-high, high-to-low), and ratings.
3. **Wishlist Management**: Toggle items into a personal wishlist with heart badge indicators.
4. **Interactive Shopping Cart Drawer**: Dynamic item quantity modification, subtotal calculation, free shipping calculation, and promo code discounts (`NEXUS20` / `TECH20`).
5. **Customer Authentication**: Clean modal for both user sign-in and account registration.
6. **Order Processing & Confirmation**: Instant order dispatch estimation, tracking code generation (`NX-89421-PR`), and receipt breakdown.
7. **Spring Boot RESTful Backend Architecture**: Production-ready JPA entities, validation, controllers, and separation of concerns.

---

## 📄 PDF Assignment Document
The PDF report [`NEXUS_GEAR_Web_Programming_Assignment_II.pdf`](./NEXUS_GEAR_Web_Programming_Assignment_II.pdf) includes:
- Exact 17-page layout matching the sample document.
- Single neat rectangular border on every page with uniform margins.
- Standard assignment header: `22UIT501 - WEB PROGRAMMING ASSIGNMENT – II`.
- Full code listings with section dividers.
- High-resolution website screenshots for Home Page, Product Search, Shopping Cart, and Order Confirmation.
