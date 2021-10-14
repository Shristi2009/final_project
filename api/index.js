const apiRouter = require('express').Router();
const usersRouter = require('./users'); const itemsRouter = require('./items');
 const cartRouter = require('./cart');
// for token
const jwt = require('jsonwebtoken');
const SECRET = require('./secret');
const { getUserById } = require('../db');
 
apiRouter.get('/health', (req, res, next ) => {
     res.send({message: 'it is healthy'});
 });

 apiRouter.use(async (req, res, next) => {
    console.log(req.header)
     if(req.header('Authorization')) {
         const authHeader = req.header('Authorization');
         if (!authHeader) {
             next();
         }
         const token = authHeader.split('Bearer ')[1];
         const { id } = jwt.verify(token, SECRET);
         console.log('HERES YOUR ID', id);
         if(!id) {
             next();
         }
         req.user = await getUserById(id);
         console.log("REQ USER",req.user);
         next();
     } else {
         next();
     }
  });
  
 
 apiRouter.use('/users', usersRouter);
 apiRouter.use('/items', itemsRouter);
 apiRouter.use('/cart', cartRouter);


 module.exports = apiRouter; 