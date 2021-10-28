const { 
    getCartById,
    createCart,
    removeItem,
    deleteCart,
    getCartByUsersId,
    getCartAndItemsByUserId,
    getCartAndItemsInPrcoessByUserId,
    editCart,
    cartcheckout
} = require("../db");

const cartRouter = require('express').Router();

cartRouter.get('/', async (req, res, next) => {
    
    try {
        if(req.user){
            const cartByUsersId = await getCartByUsersId(req.user.id)
            //const cart = await getCartById(cartByUsersId.usersId); 
            console.log('GETTING CART BY ID:');
            res.send(cartByUsersId);
        }else{
            res.status(401)
            next({message:"no user"});    
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR GETTING CART By ID');
        next(error);
    }
});

cartRouter.get('/:usersId', async (req, res, next) => {
    console.log(req.params.usersId)
    try {
        if(req.user.id == req.params.usersId){
            const cart = await getCartAndItemsByUserId(req.params.usersId); 
            console.log('GETTING CART ITEMS BY USERID:');
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

cartRouter.get('/inProcess/:usersId', async (req, res, next) => {
    console.log(req.params.usersId)
    try {
        if(req.user.id == req.params.usersId){
            const cart = await getCartAndItemsInPrcoessByUserId(req.params.usersId); 
            console.log('GETTING CART ITEMS BY USERID:');
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
cartRouter.patch('/editCart/:username', async (req, res, next) => {
    try {
        if(req.user.username == req.params.username){
            const editedCart = await editCart(req.body); 
            res.send(editedCart);
        } else {
            res.status(401)
            next({message:"no user match"});
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR CREATING CART');
        next(error);
    }
});

cartRouter.patch('/cartCheckout/:username', async (req, res, next) => {
    try {
        if(req.user.username==req.params.username){
            const checkedoutCart = await cartcheckout(req.body); 
            res.send(checkedoutCart);
        } else {
            res.status(401)
            next({message:"no user"});
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR CREATING CART');
        next(error);
    }
});

// cartRouter.delete('/removeItem', async (req, res, next) => {
    
//     try {
//         if(req.user){
//             const {id} =req.user;
//             const getCart =getCartByUsersId(id)
//             const removeItemFromCart = await removeItem(getCart.itemsid); 
//             res.send(removeItemFromCart);
//         } else {
//             res.status(401)
//             next({message:"no user"});
//         }
//     } catch (error) {
//         console.log('THERE WAS AN ERROR removing item cart');
//         next(error);
//     }
// });
   
cartRouter.delete('/:CartId', async (req, res, next) => {
    
    try {
        if(req.user){
        
           // const getCart =getCartByUsersId(req.user.id)
            const deletedCart = await deleteCart(req.params.CartId); 
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