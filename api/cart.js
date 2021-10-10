const { getCartById,
    createCart,
    removeItem,
    deleteCart,
    getCartByUsersId
} = require("../db");

const cartRouter = require('express').Router();

cartRouter.get('/', async (req, res, next) => {
    const {id}= req.user;
try {


    const cart = await getCartByUserId(id); 
    console.log('GETTING CART BY ID:');
    res.send(cart);
} catch (error) {
    console.log('THERE WAS AN ERROR GETTING CART By ID');
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

