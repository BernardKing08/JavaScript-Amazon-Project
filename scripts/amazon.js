import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utlis/money.js';

let productsHtml = '';

// Function to render products
function renderProducts(productsToRender, containerSelector) {
  let html = '';
  
  productsToRender.forEach((product, index) => {
    html += `<div class="product-container">
          <!-- Sticky Number -->
          <div class="product-number">${index + 1}</div>
          
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count} 
            </div>
          </div>

          <div class="product-price">
            ${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
  });

  document.querySelector(containerSelector).innerHTML = html;

  // Attach event listeners to "Add to Cart" buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}


// Initial render of all products
renderProducts(products, '.js-products-grid');

// Function to update cart quantity
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// Function to handle search
export function handleSearch() {
  const searchInput = document.querySelector('.search-bar').value.toLowerCase();

  if (searchInput === '') {
    // If the search bar is empty, reset to the normal grid setting
    renderProducts(products, '.js-products-grid');
    document.querySelector('.js-products-search-grid').innerHTML = '';
    document.querySelector('.js-products-grid').style.display = 'grid';
    return; // Exit the function early
  }

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput)
  );

  // Render the filtered products in the search grid
  renderProducts(filteredProducts, '.js-products-search-grid');

  // Hide the main grid when search results are displayed
  const searchGrid = document.querySelector('.js-products-search-grid');
  const mainGrid = document.querySelector('.js-products-grid');
    // Ternary operator for displaying the grids
    searchGrid.style.display = filteredProducts.length ? 'grid' : 'none';
    mainGrid.style.display = filteredProducts.length ? 'none' : 'grid';
}

// Attach search functionality to the search bar and button
document.querySelector('.search-bar').addEventListener('input', handleSearch);
document.querySelector('.search-button').addEventListener('click', handleSearch);

////////////////voice recognition/////////////////////
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  document.getElementById('voice-feedback').textContent = `You said: "${command}"`;

  // Search command
  if (command.startsWith("search")) {
    let searchTerm = command.replace("search", "").trim();
    let newSearchTerm = searchTerm.replace(/\.$/, "");
    document.querySelector('.search-bar').value = newSearchTerm; // Set the search bar value
    handleSearch(); // Trigger the search functionality
  }
  // Add to cart command with index support
  else if (command.match(/^add item \d+$/)) {
    let index = parseInt(command.replace("add item", "").trim()) - 1;
    if (index >= 0 && index < products.length) {
      addToCart(products[index].id);
      updateCartQuantity();
      alert(`Added "${products[index].name}" to the cart.`);
    } else {
      alert(`Invalid item number: ${index + 1}.`);
    }
  }
  // Remove from cart command with index support
  else if (command.match(/^remove item \d+$/)) {
    let index = parseInt(command.replace("remove item", "").trim()) - 1;
    if (index >= 0 && index < products.length) {
      const cartItemIndex = cart.findIndex(item => item.productId === products[index].id);
      if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
        updateCartQuantity();
        alert(`Removed "${products[index].name}" from the cart.`);
      } else {
        alert(`"${products[index].name}" is not in the cart.`);
      }
    } else {
      alert(`Invalid item number: ${index + 1}.`);
    }
  }
  // Add to cart command using product name
  else if (command.startsWith("add")) {
    let productName = command.replace("add", "").replace("to cart", "").trim();
    productName = productName.replace(/[^\w\s]/g, ""); // Sanitize product name
    const product = products.find(p => p.name.toLowerCase() === productName);
    if (product) {
      addToCart(product.id);
      updateCartQuantity();
      alert(`Added "${productName}" to the cart.`);
    } else {
      alert(`Product "${productName}" not found.`);
    }
  }
  // Remove from cart command using product name
  else if (command.startsWith("remove")) {
    let productName = command.replace("remove", "").replace("from cart", "").trim();
    productName = productName.replace(/[^\w\s]/g, ""); // Sanitize product name
    const cartItemIndex = cart.findIndex(item => {
      const product = products.find(p => p.id === item.productId);
      return product && product.name.toLowerCase() === productName;
    });
    if (cartItemIndex !== -1) {
      cart.splice(cartItemIndex, 1);
      updateCartQuantity();
      alert(`Removed "${productName}" from the cart.`);
    } else {
      alert(`Product "${productName}" not found in the cart.`);
    }
  } else {
    alert(`Unrecognized command: "${command}"`);
  }
};


recognition.onerror = function (event) {
  console.error('Speech recognition error:', event.error);
};

document.getElementById('start-voice').addEventListener('click', () => {
  recognition.start();
  document.getElementById('voice-feedback').textContent = 'Listening...';
});


//////////// Possible improvement //////////////////
/*
  Now in the mapping of of the index numbering(number at the top left 
    and the products it can be in the form of a map inorder for adding products
    to be much easier i.e using key value pairs for easy retrival)
*/
