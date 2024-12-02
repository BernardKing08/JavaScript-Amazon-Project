import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCartQuantity } from "./checkout/cartQuantity.js";
import '../data/cart-class.js';

renderOrderSummary();

renderPaymentSummary();

renderCartQuantity();