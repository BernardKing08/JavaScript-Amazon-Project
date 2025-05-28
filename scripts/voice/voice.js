import { cart, addToCart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { handleSearch } from '../amazon.js';


// Initialize SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase().trim();
  console.log(`You said: "${command}"`);

  // Handle search command
  if (command.startsWith("search")) {
    const searchTerm = command.replace("search", "").trim();
    document.querySelector('.search-bar').value = searchTerm;
    handleSearch();
  }

  // Handle add command
  else if (command.startsWith("add")) {
    let input = command.replace("add", "").replace("to cart", "").trim();

    if (input.startsWith("item")) {
      const numberMatch = input.match(/\d+/);
      if (numberMatch) {
        const index = parseInt(numberMatch[0]) - 1;
        if (index >= 0 && index < products.length) {
          addToCart(products[index].id);
          alert(`"${products[index].name}" added to cart.`);
        } else {
          alert(`Invalid item number: ${index + 1}.`);
        }
      } else {
        alert(`Please specify a valid item number.`);
      }
    } else {
      input = input.replace(/[^\w\s]/g, ""); // Sanitize
      const product = products.find(p => p.name.toLowerCase() === input);
      if (product) {
        addToCart(product.id);
        alert(`"${product.name}" added to cart.`);
      } else {
        alert(`Product "${input}" not found.`);
      }
    }
  }

  // Handle remove command
  else if (command.startsWith("remove")) {
    let input = command.replace("remove", "").replace("from cart", "").trim();

    if (input.startsWith("item")) {
      const numberMatch = input.match(/\d+/);
      if (numberMatch) {
        const index = parseInt(numberMatch[0]) - 1;
        if (index >= 0 && index < products.length) {
          removeFromCart(products[index].id);
          alert(`"${products[index].name}" removed from cart.`);
        } else {
          alert(`Invalid item number: ${index + 1}.`);
        }
      } else {
        alert(`Please specify a valid item number.`);
      }
    } else {
      input = input.replace(/[^\w\s]/g, ""); // Sanitize
      const product = products.find(p => p.name.toLowerCase() === input);
      if (product) {
        removeFromCart(product.id);
        alert(`"${product.name}" removed from cart.`);
      } else {
        alert(`Product "${input}" not found in cart.`);
      }
    }
  }
};

recognition.onerror = function (event) {
  console.error('Speech recognition error:', event.error);
  document.getElementById('voice-feedback').textContent = 'Error occurred.';
};

document.querySelector('.voice-button').addEventListener('click', () => {
  recognition.start();
  document.getElementById('voice-feedback').textContent = 'Listening...';
});

recognition.onend = function () {
  document.getElementById('voice-feedback').textContent = '';
};
