import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function orderHeader(order) {
  const dateString = dayjs(order.orderTime).format("MMMM D");
  return `<div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
        </div>`;
}

function orderDetails(products) {
  let orderDetailsHTML = "";

  products.forEach((productItem) => {
    const estimatedDateString = dayjs(productItem.estimatedDeliveryTime).format(
      "MMMM D"
    );

    const matchingProduct = getProduct(productItem.productId);
    orderDetailsHTML += `
        <div class="product-image-container">
            <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
            Arriving on: ${estimatedDateString}
            </div>
            <div class="product-quantity">
            Quantity: ${productItem.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again" 
            data-product-id=${productItem.productId}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html">
            <button class="track-package-button button-secondary">
                Track package
            </button>
            </a>
        </div>
    `;
  });

  return orderDetailsHTML;
}

function renderOrder() {
  let ordersHTML = "";
  orders.forEach((order) => {
    ordersHTML += `          
        ${orderHeader(order)}

        <div class="order-details-grid">
        ${orderDetails(order.products)}
        </div>
    `;
  });

  document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
}

async function loadOrderPage() {
  document.querySelector(".js-cart-quantity").innerHTML =
    cart.getTotalQuantity();

  await loadProductsFetch();
  renderOrder();

  document.querySelectorAll(".js-buy-again").forEach((buyAgainBtn) => {
    buyAgainBtn.addEventListener("click", () => {
      const productId = buyAgainBtn.dataset.productId;

      cart.addToCart(productId, 1);
      window.location.href = "checkout.html";
    });
  });
}

loadOrderPage();
