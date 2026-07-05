# APEX — Shoes E-Commerce Website

A fully dynamic, front-end e-commerce web application for browsing and purchasing shoes, built entirely with **vanilla HTML, CSS, and JavaScript** — no frameworks, no libraries, no build tools.

🔗 **Live Demo:** [adhamahmed007.github.io/shoesE-commerce](https://adhamahmed007.github.io/shoesE-commerce/)

---

## 📌 Overview

APEX is a single-page shoe store that fetches real product data from a remote JSON API and renders it dynamically in the browser. It includes a complete client-side shopping experience: product browsing, live search and sorting, a persistent cart with a mini-cart dropdown, toast notifications, and an image zoom modal — all built from scratch using core JavaScript, with zero external JS dependencies beyond Font Awesome icons.

---

## ✨ Features & Advantages

### 🛍️ Dynamic Product Catalog
- Product data (name, price, brand, image) is fetched live from a remote JSON API using the native `fetch()` API — the catalog is never hardcoded into the HTML.
- Product cards are generated and injected into the page automatically, so adding or changing products only requires updating the data source, not the code.

### 🔍 Real-Time Search & Sort
- Instantly filter products by name as the user types, with no page reload.
- Sort products by price (low to high, high to low) or alphabetically by name, giving users full control over how they browse.

### 🛒 Full Shopping Cart System
- Add products to a cart with a single click, with instant visual feedback.
- A live cart icon badge always reflects the current item count.
- A mini-cart dropdown lists every item with its price and a running total, and lets users remove individual items on the fly.
- An order confirmation flow validates that the cart isn't empty before completing checkout, preventing accidental empty orders.

### 🔔 Custom Toast Notification System
- A self-contained, reusable notification component (built without any external UI library) gives users clear, non-intrusive feedback for every action — adding to cart, confirming an order, or catching an empty cart.
- Smooth fade in/out animations are handled with precisely-timed transitions for a polished feel.

### 🖼️ Image Zoom Modal
- Clicking any product image opens a full-size zoomed view in a modal overlay, improving product visibility before purchase.
- The modal can be closed by clicking its background or a dedicated close button, matching familiar UX conventions.

### 🖱️ Smart UI Behavior
- The mini-cart and image modal both close automatically when the user clicks anywhere outside them, avoiding the need for extra "close" clicks.
- Event propagation is carefully managed so that opening the cart doesn't accidentally trigger its own closing logic.

### ⚡ Lightweight & Framework-Free
- Built purely with HTML, CSS, and JavaScript — no React, no jQuery, no build step. This keeps the project fast, dependency-free, and easy for beginners to read, learn from, and extend.
- The entire product/cart state is managed through plain JavaScript arrays and objects, making the data flow simple to follow from fetch → render → interact → re-render.

### 📱 Clean, Responsive Card-Based Layout
- Products are displayed in a clean, card-based grid that adapts to the content, giving the store a modern, professional storefront feel.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and markup |
| **CSS3** | Styling, layout, and animations |
| **JavaScript (ES6+)** | App logic: fetching data, rendering UI, cart management, event handling |
| **Fetch API** | Retrieving live shoe data from a remote JSON source |
| **Font Awesome** | Icons used across the cart, notifications, and UI controls |
| **GitHub Pages** | Hosting the live deployed site |

---

## ⚙️ How It Works (High-Level Flow)

1. On page load, the app fetches shoe data from a remote JSON API and renders the first set of products as cards.
2. Users can search and sort the displayed products instantly, entirely on the client side.
3. Clicking **Add to Cart** pushes the item into the cart, updates the cart badge, refreshes the mini-cart dropdown, and shows a toast confirmation.
4. Clicking the cart icon opens the mini-cart, where items can be reviewed, removed, or the order confirmed.
5. Confirming an order validates the cart isn't empty, shows a success notification, and resets the cart.
6. Clicking a product image opens a zoomed-in view in a modal, closable by clicking outside it or its close button.

---

## 🚀 Getting Started (Run Locally)

1. Clone the repository:
   ```bash
   git clone https://github.com/adhamahmed007/shoesE-commerce.git
   ```
2. Navigate into the project folder:
   ```bash
   cd shoesE-commerce
   ```
3. Open `index.html` directly in your browser, or serve it locally, for example:
   ```bash
   npx serve .
   ```

No build step, no dependencies to install — it just runs.

---

## 👤 Author

**Adham Ahmed**
GitHub: [@adhamahmed007](https://github.com/adhamahmed007)

---

## 📄 License

This project is open for educational and personal use.
