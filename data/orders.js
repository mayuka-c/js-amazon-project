export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function getOrder(orderId) {
  let matchingOrder;
  orders.forEach((product) => {
    if (orderId === product.id) {
      matchingOrder = product;
    }
  });

  return matchingOrder;
}

export function fetchProductOrderDetails(order, productId) {
  let matchingItem;
  order.products.some((item) => {
    if (item.productId === productId) {
      matchingItem = item;
      return true;
    }
  });

  return {quantity: matchingItem.quantity, estimatedDelivery: matchingItem.estimatedDeliveryTime};
}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
