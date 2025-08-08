import { getOrder, fetchProductOrderDetails } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function fetchURLParameters() {
  const url = new URL(window.location.href);
  return {
    orderId: url.searchParams.get("orderId"),
    productId: url.searchParams.get("productId"),
  };
}

function renderTrackingDetails() {
  const { orderId, productId } = fetchURLParameters();

  const matchingOrder = getOrder(orderId);

  if (matchingOrder === undefined) {
    document.querySelector(".js-order-tracking").innerHTML = "No orders to track";
    return; 
  }

  const {
    quantity,
    estimatedDelivery,
    status = "Shipped",
  } = fetchProductOrderDetails(matchingOrder, productId);
  const matchingProduct = getProduct(productId);

  const dateString = dayjs(estimatedDelivery).format("dddd, MMMM D");

  // Map status to progress percentage and label index
  const statusMap = {
    Preparing: { percent: 0, index: 0 },
    Shipped: { percent: 50, index: 1 },
    Delivered: { percent: 100, index: 2 },
  };
  const progress = statusMap[status] || statusMap["Preparing"];

  const trackingDetailHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>

    <div class="delivery-date">Arriving on ${dateString}</div>

    <div class="product-info">
        ${matchingProduct.name}
    </div>

    <div class="product-info">Quantity: ${quantity}</div>

    <img
        class="product-image"
        src="${matchingProduct.image}"
    />

    <div class="progress-labels-container">
        <div class="progress-label${
          progress.index === 0 ? " current-status" : ""
        }">Preparing</div>
        <div class="progress-label${
          progress.index === 1 ? " current-status" : ""
        }">Shipped</div>
        <div class="progress-label${
          progress.index === 2 ? " current-status" : ""
        }">Delivered</div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar"></div>
    </div>
    `;

  document.querySelector(".js-order-tracking").innerHTML = trackingDetailHTML;

  // Animate progress bar
  setTimeout(() => {
    const bar = document.querySelector(".js-progress-bar");
    bar.style.transition = "width 1.5s ease";
    bar.style.width = `${progress.percent}%`;
  }, 100);
}

async function loadTrackingPage() {
  document.querySelector(".js-cart-quantity").innerHTML =
    cart.getTotalQuantity();

  await loadProductsFetch();
  renderTrackingDetails();
}

loadTrackingPage();
