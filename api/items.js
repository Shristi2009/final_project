const itemsRouter = require('express').Router();


const { getAllItems,
        createItem,
        getItemById,
        updateItem,
        deleteItem
} = require("../db");

itemsRouter.get('/', async (req, res, next) => {
    try {
        
        const items = await getAllItems(); 
        
        res.send(items);
        next();
    } catch (error) {
        console.log('THERE WAS AN ERROR GETTING ITEMS');
        next(error);
    }
});

itemsRouter.get('/:id', async (req, res, next) => {//Colons meen a variable, use req.params
    const { id } = req.params
    try {
        
        console.log('GETTING THE ITEM');
        
        const item = await getItemById(id); 
        console.log("item",item);
        res.send(item);
        next();
    } catch (error) {
        console.log('THERE WAS AN ERROR GETTING ITEM');
        next(error);
    }
});




itemsRouter.post('/', async (req, res, next) => {
    console.log(req.user)
    try {
           
        // this should eventually check if they are admin for this.
        const createdItem = await createItem(req.body); 
         console.log(createdItem)
        res.send(createdItem);
        
    } catch (error) {
        console.log('THERE WAS AN ERROR CREATING ITEM');
        next(error);
    }
});



module.exports = itemsRouter;