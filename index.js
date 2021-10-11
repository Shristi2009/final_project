// This is the Web Server
const express = require('express');
const server = express();

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
const bodyParser = require('body-parser');
server.use(bodyParser.json());


// here's our API
const apiRouter = require('./api');
server.use('/api', apiRouter);

// bring in the DB connection
const client = require('./db/client');
const { getUserById } = require('./db');
client.connect();

//cors
const cors =require('cors');
server.use(cors());

// for token
const jwt = require('jsonwebtoken');
const SECRET = require('./api/secret');

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use(async (req, res, next) => {
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



// connect to the server
const {PORT = 3000} = process.env;

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
}); 
