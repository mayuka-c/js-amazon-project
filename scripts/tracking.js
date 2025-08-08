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
  const { quantity, estimatedDelivery } = fetchProductOrderDetails(
    matchingOrder,
    productId
  );
  const matchingProduct = getProduct(productId);

  const dateString = dayjs(estimatedDelivery).format("dddd, MMMM D");

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
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar"></div>
    </div>
    `;

  document.querySelector(".js-order-tracking").innerHTML = trackingDetailHTML;
}

async function loadTrackingPage() {
  document.querySelector(".js-cart-quantity").innerHTML =
    cart.getTotalQuantity();

  await loadProductsFetch();
  renderTrackingDetails();
}

loadTrackingPage();
