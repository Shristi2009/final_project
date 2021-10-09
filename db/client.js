// build and export your unconnected client here
const { Client } = require('pg');

const client = new Client('https://localhost:5432/finalproject-dev');

module.exports = client