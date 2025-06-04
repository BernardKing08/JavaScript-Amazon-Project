import { cart, loadFromStorage } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { addOrder } from "../../data/orderData.js";

export function setupPlaceOrderButton() {
  const placeOrderBtn = document.querySelector('.js-place-order-button');
  
  if (!placeOrderBtn) return;

  placeOrderBtn.addEventListener('click', () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderId = crypto.randomUUID(); // You can also use any UUID lib
    const total = calculateTotal();
    const datePlaced = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const orderItems = cart.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      return {
        productId: cartItem.productId,
        name: product.name,
        image: product.image,
        quantity: cartItem.quantity,
        arrivalDate: calculateArrivalDate(cartItem.deliveryOptionId)
      };
    });

    addOrder({
      id: orderId,
      datePlaced: datePlaced,
      total: total.toFixed(2),
      items: orderItems
    });

    // You can optionally clear the cart here or leave it up to the user
    localStorage.setItem('cart', JSON.stringify([]));
    loadFromStorage();

    document.querySelector('.js-order-success').classList.remove('d-none');
  });
}

function calculateTotal() {
  let total = 0;
  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    total += product.priceCents * cartItem.quantity / 100;
  });
  return total;
}

function calculateArrivalDate(deliveryOptionId) {
  const daysMap = {
    '1': 7,
    '2': 3,
    '3': 1
  };
  const now = new Date();
  now.setDate(now.getDate() + (daysMap[deliveryOptionId] || 5));
  return now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
