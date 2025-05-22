import { cart, addToCart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { handleSearch } from '../amazon.js';


// Initialize SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

recognition.onresult = function (event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log(`You said: "${command}"`);

    /*  Take the voice input 'search keyword'
        removes the 'search' leaving only the keyword to be searched and trim() it
        then passes it to the handleSearch() method in amazon.js  
    */
    if (command.startsWith("search")) {
        const searchTerm = command.replace("search", "").trim();
        document.querySelector('.search-bar').value = searchTerm;
        handleSearch();
    } 
    /*  Take the voice input 'add TO cart ITEM'
        removes the 'add to cart' leaving only the ITEM to be added to cart and trim() it removing extra spaces
        Converts the 'Item' to lowercase to get a product match  
    */
    else if (command.startsWith("add")) {
        let productName = command.replace("add", "").replace("to cart", "").trim();
        productName = productName.replace(/[^\w\s]/g, ""); // Sanitize input
        const product = products.find((p) => p.name.toLowerCase() === productName);
        if (product) { //product exists in the product array
            addToCart(product.id);
            alert(`"${product.name}" added to cart.`);
        } else {
            alert(`Product "${productName}" not found.`);
        }
    } 
    /*  Take the voice input 'remove from cart ITEM'
        removes the 'add to cart' leaving only the ITEM to be added to cart and trim() it removing extra spaces
        Converts the 'Item' to lowercase to get a product match  
    */
    else if (command.startsWith("remove")) {
        let productName = command.replace("remove", "").replace("from cart", "").trim();
        productName = productName.replace(/[^\w\s]/g, ""); // Sanitize input
        const product = products.find((p) => p.name.toLowerCase() === productName);
        if (product) {
            removeFromCart(product.id);
            alert(`"${product.name}" removed from cart.`);
        } else {
            alert(`Product "${productName}" not found in cart.`);
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
