function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
    
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
            //null check
            if(!this.cartItems){
                this.cartItems = [
                    {
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 2,
                        deliveryOptionId: '1'
                    },
                    {
                        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity: 1,
                        deliveryOptionId: '2'
                    }
                ];
            }
        },
    
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
        },
    
        //function-call to add item to cart
        addToCart(productId){
            //creating a var to hold any matching item
            let matchingItem;
    
            //running through the cart and checking if the product exists
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            })
    
            //increasing the matching item found incart by 1
            if(matchingItem){
                matchingItem.quantity++;
            }
            else{ //adding the cart and the quantity to the array
                this.cartItems.push({
                    productId: productId, 
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
    
            this.saveToStorage();
    
        },
    
        
        //removing product from the cart 
        removeFromCart(productId){
            //creating a new array
            const newCart = [];
    
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId != productId){
                    newCart.push(cartItem)
                }
            });
    
            this.cartItems = newCart;
    
            this.saveToStorage();
        },
    
        updateDeliveryOption(productId, deliveryOptionId){
            let matchingItem;
        
            //running through the cart and checking if the product exists
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            })
        
            matchingItem.deliveryOptionId = deliveryOptionId;
        
            this.saveToStorage();
        },
        
        updateQuantity(productId, newQuantity){
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                  matchingItem = cartItem;
                }
              });
            
              matchingItem.quantity = newQuantity;
            
              this.saveToStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage()
businessCart.loadFromStorage()
