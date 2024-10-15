import {cart, addToCart} from '../data/cart.js'
import {products} from '../data/products.js'
import { formatCurrency } from './utlis/money.js';

let productsHtml = '';

//takes in each product object and runs the function
products.forEach((products) => {
    productsHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count} 
            </div>
          </div>

          <div class="product-price">
            ${formatCurrency(products.priceCents)}
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

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>`
});

//adding the html to the page
document.querySelector(".js-products-grid").innerHTML = productsHtml;


//function-call to updateCart quantity
export function updateCartQuantity(){
    let cartQuantity = 0;
        //calculating the total quantity 
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

//using document selector to add an event Listener for all instance of add-to-cart feature
//to give the click feature
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        //calling the add to cart function
        addToCart(productId); 
        
        //updating the cart quantity
        updateCartQuantity();
       
    })
})
