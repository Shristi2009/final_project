const apiRouter = require('express').Router();
const usersRouter = require('./users');
const itemsRouter = require('./items');
const cartRouter = require('./cart');

 
apiRouter.get('/health', (req, res, next ) => {
     res.send({message: 'it is healthy'});
 });
 
 apiRouter.use('/users', usersRouter);
 apiRouter.use('/items', itemsRouter);
 apiRouter.use('/cart', cartRouter);


 module.exports = apiRouter; 