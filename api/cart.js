const { 
    getCartById,
    createCart,
    removeItem,
    deleteCart,
    getCartByUsersId
} = require("../db");

const cartRouter = require('express').Router();

cartRouter.get('/', async (req, res, next) => {
    const {id}= req.user;
    try {
        if(req.user){
            const cartByUsersId = await getCartByUsersId(id)
            const cart = await getCartById(cartByUsersId.usersId); 
            console.log('GETTING CART BY ID:');
            res.send(cart);
        }else{
            res.status(401)
            next({message:"no user"});    
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR GETTING CART By ID');
        next(error);
    }
});

cartRouter.get('/usersId', async (req, res, next) => {
    const {id}= req.user;
    try {
        if(req.user){
            const cart = await getCartByUsersId(id); 
            console.log('GETTING CART BY ID:');
            res.send(cart);
        }else {
            res.status(401)
            next({message:"no user"});
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR GETTING CART By USERSID');
        next(error);
    }
});



cartRouter.post('/', async (req, res, next) => {
    try {
        if(req.user){
            const createdCart = await createCart(req.body); 
            res.send(createdCart);
        } else {
            res.status(401)
            next({message:"no user"});
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR CREATING CART');
        next(error);
    }
});

cartRouter.delete('/removeItem', async (req, res, next) => {
    const {id} =req.user;
    try {
        if(req.user){
            const getCart =getCartByUsersId(id)
            const removeItemFromCart = await removeItem(getCart.itemsid); 
            res.send(removeItemFromCart);
        } else {
            res.status(401)
            next({message:"no user"});
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR removing item cart');
        next(error);
    }
});
   
cartRouter.delete('/', async (req, res, next) => {
    const {id} =req.user;
    try {
        if(req.user){
            const getCart =getCartByUsersId(id)
            const deletedCart = await deleteCart(getCart.id); 
            res.send(deletedCart);
        } else {
            res.status(401)
            next({message:"no user"});
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR deleting cart');
        next(error);
    }
});
    module.exports = cartRouter ;