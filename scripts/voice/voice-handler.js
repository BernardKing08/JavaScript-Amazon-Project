import { cart, addToCart, removeFromCart } from '../../data/cart.js';
import { products } from '../../data/products.js';

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

function updateVoiceFeedback(message) {
  const feedbackEl = document.getElementById('voice-feedback');
  if (feedbackEl) feedbackEl.textContent = message;
}

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase().trim();
  console.log(`You said: "${command}"`);

  if (command.startsWith("remove")) {
    let input = command.replace("remove", "").replace("from cart", "").trim();

    if (input.startsWith("item")) {
      const numberMatch = input.match(/\d+/);
      if (numberMatch) {
        const index = parseInt(numberMatch[0]) - 1;
        if (index >= 0 && index < products.length) {
          removeFromCart(products[index].id);
          console.log(`"${products[index].name}" removed from cart.`);
          alert(`"${products[index].name}" removed from cart.`);
        } else {
          console.log(`Invalid item number: ${index + 1}.`);
        }
      } else {
        console.log(`Please specify a valid item number.`);
      }
    } else {
      input = input.replace(/[^\w\s]/g, "");
      const product = products.find(p => p.name.toLowerCase() === input);
      if (product) {
        removeFromCart(product.id);
        console.log(`"${product.name}" removed from cart.`);
        alert(`"${product.name}" removed from cart.`);
      } else {
        console.log(`Product "${input}" not found.`);
      }
    }
  }

  else if (command.startsWith("add")) {
    let input = command.replace("add", "").replace("to cart", "").trim();

    if (input.startsWith("item")) {
      const numberMatch = input.match(/\d+/);
      if (numberMatch) {
        const index = parseInt(numberMatch[0]) - 1;
        if (index >= 0 && index < products.length) {
          addToCart(products[index].id);
          console.log(`"${products[index].name}" added to cart.`);
          alert(`"${products[index].name}" added to cart.`);
        } else {
          console.log(`Invalid item number: ${index + 1}.`);
        }
      } else {
        console.log(`Please specify a valid item number.`);
      }
    } else {
      input = input.replace(/[^\w\s]/g, "");
      const product = products.find(p => p.name.toLowerCase() === input);
      if (product) {
        addToCart(product.id);
        console.log(`"${product.name}" added to cart.`);
        alert(`"${product.name}" added to cart.`);
      } else {
        console.log(`Product "${input}" not found.`);
      }
    }
  }

  else if (command.includes("place order") || command.includes("confirm checkout") || command.includes("buy now")) {
    if (window.location.pathname.includes("checkout.html")) {
      console.log("Are you sure you want to place this order?");
      updateVoiceFeedback("Say 'yes' to confirm.");

      recognition.onresult = function (event2) {
        const confirmation = event2.results[0][0].transcript.toLowerCase().trim();
        if (["yes", "confirm", "place it"].includes(confirmation)) {
          console.log("Order placed successfully.");
          alert("Order placed!");
          const button = document.querySelector('.place-order-button');
          if (button) button.click();
        } else {
          console.log("Order cancelled.");
          alert("Order cancelled.");
        }
      };

      recognition.start();
    } else {
      console.log("You can only place an order from the checkout page.");
    }
  }

  else if (command.includes("go to") || command.includes("open")) {
    if (command.includes("home")) {
      window.location.href = 'amazon.html';
    } else if (command.includes("products") || command.includes("shop")) {
      window.location.href = 'amazon.html';
    } else if (command.includes("checkout") || command.includes("cart")) {
      window.location.href = 'checkout.html';
    } else if (command.includes("payment")) {
      window.location.href = 'payment.html';
    } else if (command.includes("track")) {
      window.location.href = 'tracking.html';
    } else {
      console.log("Page not recognized.");
    }
  }

  else {
    console.log("Command not recognized.");
  }
};

recognition.onerror = function (event) {
  console.error('Speech recognition error:', event.error);
  updateVoiceFeedback('Error occurred.');
};

const voiceButton = document.querySelector('.voice-button');
if (voiceButton) {
  voiceButton.addEventListener('click', () => {
    recognition.start();
    updateVoiceFeedback('Listening...');
  });
}

recognition.onend = function () {
  updateVoiceFeedback('');
};
