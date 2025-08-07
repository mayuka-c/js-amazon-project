/* 
{productId: "", quantity: 0}
*/

class Cart {
  cartItems;

  constructor() {
    this.#loadFromStorage();
  }

  // private method
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart-oop")) || [];
  }

  saveToStorage() {
    localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
  }

  removeFromStorage() {
    localStorage.removeItem("cart-oop");
  }

  addToCart(productId, quantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  removeAll() {
    this.cartItems = [];
    this.removeFromStorage();
  }

  getTotalQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }
}

export const cart = new Cart();
