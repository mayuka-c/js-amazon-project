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

  addToCart(productId) {
    console.log(productId);
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    console.log(this.cartItems);
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
}

export const cart = new Cart();
