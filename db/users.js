const client = require('./client');

async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }
  
  
  async function createUser({ username, password, active, admin, firstName, lastName, location }) {
    try {
      const { rows } = await client.query(`
      INSERT INTO users(username, password, active, admin, "firstName", "lastName", location ) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password, active, admin, firstName, lastName, location]);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getUserById(id) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE id='${ id }';
      `);
  
      return user;
    } catch (error) {
      throw error;
    }
  }
  

  async function getUserByUsername (username) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username =$1;
      `,[username]);
      return user;
    } catch (error) {
      throw error;
    }
  }
// testing 123

  module.exports = {
      getAllUsers,
      createUser, 
      getUserById, 
      getUserByUsername
  }