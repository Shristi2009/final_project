const cart_itemsRouter = require('express').Router();

const {addItemToCart, updateCartItem, destroyCartItem, getItemsByCartId, clearCart} = require('../db');

cart_itemsRouter.get('/:cart_id', async (req, res, next) => {
    const id = req.params.cart_id;
    try {
        if(req.user) {
            const cartItems = await getItemsByCartId(id);
            res.send(cartItems);
            next();
        }
        
        res.status(401);
        next({message:"no user"});  
    } catch (error) {
        next(error);
    }
});

cart_itemsRouter.post('/', async (req, res, next) => { 
    const {cart_id, product_id, quantity} = req.body;
    try {
        if(req.user) {
            const newItem = await addItemToCart({cart_id, product_id, quantity});
            res.send(newItem);
            next();
        }
        res.status(401);
        next({message:"no user"});  
    } catch (error) {
        next(error);
    }
});

cart_itemsRouter.patch('/:cart_itemId', async (req, res, next) => {
    const id = req.params.cart_itemId;
    const {quantity} = req.body;
    try {
        if(req.user) {
            const updatedItem = await updateCartItem({id, quantity});
            res.send(updatedItem);
            next();
        }
        res.status(401)
        next({message:"no user"});  
    } catch (error) {
        next(error);
    }
});

cart_itemsRouter.delete('/:cart_itemId', async (req, res, next) => {
    const id = req.params.cart_itemId;
    try{
        const deleteItem = await destroyCartItem(id);
        res.send({deleteItem});
    } catch (error) {
        throw error;
    }
});

cart_itemsRouter.delete('/clear_cart/:cart_id', async(req, res, next) => {
    const id = req.params.cart_id;
    try {
        const clearItems = await clearCart(id);
        res.send(clearItems);
    } catch (error) {
        throw error;
    }
});

module.exports = cart_itemsRouter;