import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeaderMiddleSection } from "./checkout/header.js";
// import '../data/cart-class.js';

// new Promise((resolve) => {
//   loadProductsFetch(() => {
//     resolve();
//   });
// })
//   .then(() => {
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// Promise.all([
//   new Promise((resolve) => {
//     loadProductsFetch(() => {
//       resolve();
//     });
//   }),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

async function loadPage() {
  renderCheckoutHeaderMiddleSection();
  await loadProductsFetch();

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
