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