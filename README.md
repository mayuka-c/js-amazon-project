# Amazon Frontend Project

This project is a simplified Amazon-like e-commerce frontend built with JavaScript, HTML, and CSS. It demonstrates product browsing, cart management, checkout, order tracking, and more.

## Features
- Product grid with images, ratings, and prices
- Add to cart with quantity selection
- Cart and checkout pages
- Order summary and payment
- Order tracking with animated progress bar
- Responsive design

## Project Structure
```
frontend/javascript-amazon-project/
├── amazon.html           # Main shopping page
├── checkout.html         # Checkout page
├── orders.html           # Orders history
├── tracking.html         # Order tracking
├── backend/              # (Sample) product data
├── data/                 # JS modules for cart, products, orders, delivery
├── images/               # Product and UI images
├── scripts/              # JS files for each page
├── styles/               # CSS files
└── README.md             # Project documentation
```

## Getting Started
1. Clone the repository:
   ```sh
   git clone <repo-url>
   ```
2. Open `amazon.html` in your browser to start shopping.
3. Use `checkout.html` to view and place orders.
4. Track orders via `tracking.html`.

## Development
- All logic is in the `scripts/` folder, organized by page.
- Data modules are in `data/`.
- Images and icons are in `images/`.
- Styles are in `styles/`.

## Customization
- Add products in `backend/products.json`.
- Update delivery options in `data/deliveryOptions.js`.
- Modify UI in `styles/pages/` and `styles/shared/`.


Credit: This is built as part of learning JS from SuperSimpleDev Tutorial.