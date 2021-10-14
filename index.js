// This is the Web Server
require('dotenv').config();
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



//cors
const cors =require('cors');
server.use(cors());



server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});



client.connect();
// connect to the server
const {PORT = 3000} = process.env;

server.listen(PORT, () => {

  console.log(`server listening on http://localhost:${PORT}`);
}); 
