const itemsRouter = require('express').Router();
// const jwt = require('jsonwebtoken'); //will need this eventually

const { getAllItems,
        createItem,
        getItemById,
        updateItem,
        deleteItem
} = require("../db");

itemsRouter.get('/', async (req, res, next) => {
    try {
        
        const items = await getAllItems(); 
        console.log('THE ITEMS YOUR GETTING ARE:');
        res.send(items);
    } catch (error) {
        console.log('THERE WAS AN ERROR GETTING ITEMS');
        next(error);
    }
});

itemsRouter.get('/:id', async (req, res, next) => {//Colons meen a variable, use req.params
    const { id } = req.params
    try {
        
        console.log('GETTING THE ITEM');
        
        const item = await getItemById({id}); 

        res.send(item);
    } catch (error) {
        console.log('THERE WAS AN ERROR GETTING ITEM');
        next(error);
    }
});




itemsRouter.post('/', async (req, res, next) => {
    try {
        if(req.user){
        // this should eventually check if they are admin for this.
        const createdItem = await createItem(req.body); 

        res.send(createdItem);
        } else {
            res.status(401)
            next({message:"no user"});
        }
    } catch (error) {
        console.log('THERE WAS AN ERROR CREATING ITEM');
        next(error);
    }
});



module.exports = itemsRouter;