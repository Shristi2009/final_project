// const { Client } = require('pg');
// const DB_NAME = 'finalproject-dev'
// const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
// const client = new Client(DB_URL);
// const { client } = require('./client')

const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/finalproject-dev');
const { 
  createUser, 
  getAllUsers
} = require('./users');



// and export them
module.exports = {
  client,
  getAllUsers,
  createUser
}