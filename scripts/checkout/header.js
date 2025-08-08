import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeaderMiddleSection() {
  const headerItems =
    cart.cartItems.length === 0 || cart.cartItems.length === 1
      ? `${cart.cartItems.length} item`
      : `${cart.cartItems.length} items`;

  document.querySelector(".js-header-middle-section").innerHTML = `
  Checkout (<a class="return-to-home-link" href="amazon.html">${headerItems}</a
    >)
  `;
}
