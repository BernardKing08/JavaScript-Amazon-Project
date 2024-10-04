export let cart

loadFromStorage()

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

    //null check
    if(!cart){
        cart = [
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
}


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

//function-call to add item to cart
export function addToCart(productId){
    //creating a var to hold any matching item
    let matchingItem;

    //running through the cart and checking if the product exists
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })

    //increasing the matching item found incart by 1
    if(matchingItem){
        matchingItem.quantity++;
    }
    else{ //adding the cart and the quantity to the array
        cart.push({
            productId: productId, 
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();

}


//removing product from the cart 
export function removeFromCart(productId){
    //creating a new array
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId != productId){
            newCart.push(cartItem)
        }
    });

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    //running through the cart and checking if the product exists
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}