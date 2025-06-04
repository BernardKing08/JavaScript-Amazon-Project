// orders.js
import { addToCart } from "../../data/cart.js";

// Sample list of orders
const orders = [
  {
    id: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
    date: 'August 12',
    total: 35.06,
    products: [
      {
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        quantity: 1,
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        delivery: 'August 15',
        productId: 'sock-6pairs'
      },
      {
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        quantity: 2,
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        delivery: 'August 19',
        productId: 'tshirt-2pack'
      }
    ]
  },
  {
    id: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
    date: 'June 10',
    total: 41.90,
    products: [
      {
        name: 'Intermediate Size Basketball',
        quantity: 2,
        image: 'images/products/intermediate-composite-basketball.jpg',
        delivery: 'June 17',
        productId: 'basketball'
      }
    ]
  }
];

// Renders orders on the page
function renderOrders() {
  const ordersGrid = document.querySelector('.orders-grid');
  ordersGrid.innerHTML = ''; // clear static HTML

  orders.forEach(order => {
    const orderHtml = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.date}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${order.total.toFixed(2)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${order.products.map(product => `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>
            <div class="product-details">
              <div class="product-name">${product.name}</div>
              <div class="product-delivery-date">Arriving on: ${product.delivery}</div>
              <div class="product-quantity">Quantity: ${product.quantity}</div>
              <button class="buy-again-button button-primary" data-product-id="${product.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">Track package</button>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    ordersGrid.insertAdjacentHTML('beforeend', orderHtml);
  });

  // Reattach button listeners
  document.querySelectorAll('.buy-again-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId); // This function should handle cart logic
      alert(`Added ${productId} to cart`);
    });
  });
}

renderOrders();
