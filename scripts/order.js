// scripts/orders.js
import { addToCart } from "../../data/cart.js";
import { getOrders } from "../../data/orderData.js";

function renderOrders() {
  // Grab the <div class="orders-grid"> container
  const ordersGrid = document.querySelector(".orders-grid");
  if (!ordersGrid) return;

  // Get the array of all placed orders from localStorage
  const orders = getOrders(); // returns [] if none

  // If no orders exist, show a fallback message
  if (orders.length === 0) {
    ordersGrid.innerHTML = `
      <div class="no-orders-message">
        You haven't placed any orders yet.
      </div>
    `;
    return;
  }

  // Otherwise, clear any static content and render each order
  ordersGrid.innerHTML = ""; // remove any placeholder markup

  orders.forEach((order) => {
    // Each order may have multiple items
    const orderHtml = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.datePlaced}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${parseFloat(order.total).toFixed(2)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${order.items
            .map(
              (item) => `
            <div class="product-image-container">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-details">
              <div class="product-name">${item.name}</div>
              <div class="product-delivery-date">Arriving on: ${item.arrivalDate}</div>
              <div class="product-quantity">Quantity: ${item.quantity}</div>
              <button
                class="buy-again-button button-primary"
                data-product-id="${item.productId}"
              >
                <img class="buy-again-icon" src="images/icons/buy-again.png" alt="">
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
          `
            )
            .join("")}
        </div>
      </div>
    `;

    ordersGrid.insertAdjacentHTML("beforeend", orderHtml);
  });

  // Re-attach “Buy it again” click listeners
  document.querySelectorAll(".buy-again-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      alert(`Added ${productId} to cart.`);
      // If you have a function that re-renders cart quantity in the header, call it here
      // e.g. renderCartQuantity();
    });
  });
}

// Call the function once the module loads
renderOrders();
