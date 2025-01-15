import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCartQuantity } from "./checkout/cartQuantity.js";
import { loadProductsFetch } from "../data/products.js";
import { loadFromStorage } from "../data/cart.js";

Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadFromStorage();
        resolve(); // Resolve immediately since `loadFromStorage` is synchronous.
    })
])
.then(() => {
    renderOrderSummary();
    renderPaymentSummary();    
    renderCartQuantity();
})

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();    
    renderCartQuantity();
});
*/