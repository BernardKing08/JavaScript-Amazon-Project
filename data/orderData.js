// data/orderData.js

export let orders;

loadOrdersFromStorage();

function loadOrdersFromStorage() {
  orders = JSON.parse(localStorage.getItem("placed-orders"));
  if (!orders) {
    orders = [];
  }
}

function saveOrdersToStorage() {
  localStorage.setItem("placed-orders", JSON.stringify(orders));
}

// Append a new order object (with id, datePlaced, total, items[])
export function addOrder(order) {
  orders.push(order);
  saveOrdersToStorage();
}

// Return the in-memory array of orders (loaded from localStorage)
export function getOrders() {
  return orders;
}
