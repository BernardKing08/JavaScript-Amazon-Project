import {cart, addToCart, loadFromStorage} from '../../data/cart.js'

//testing the add to cart function
describe('Add to cart', () => {
    it('adds an existing product to the cart', () =>{

        spyOn(localStorage, 'setItem'); 

        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
            
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        //checking if a method is called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        //checking the first product
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        //checking the quantity of the first product
        expect(cart[0].quantity).toEqual(1)

        console.log(localStorage.getItem('cart'));
        loadFromStorage();
    });
    it('add a new product to the cart', () => {
        //creating fake setCart
        spyOn(localStorage, 'setItem');

        //creating a mock test
        spyOn(localStorage, 'getItem').and.callFake(() =>{
            return JSON.stringify([]);
        });

        console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        //checking if a method is called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        //checking the first product
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        //checking the quantity of the first product
        expect(cart[0].quantity).toEqual(1)
    })
})