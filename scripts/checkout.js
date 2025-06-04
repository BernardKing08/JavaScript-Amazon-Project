import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCartQuantity } from "./checkout/cartQuantity.js";
import { setupPlaceOrderButton } from "./checkout/placeOrder.js"

renderOrderSummary();

renderPaymentSummary();

renderCartQuantity();

//soon to call the placeOrder.js from here 
setupPlaceOrderButton();