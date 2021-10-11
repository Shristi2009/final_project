const client = require('./client');

async function getAllItems() {
    const { rows } = await client.query(
      `SELECT *
      FROM items;
    `);
  
    return rows;
  }

  async function getItemById(id) {
    try {
      const { rows: [ items ] } = await client.query(`
        SELECT *
        FROM items
        WHERE id='${ id }';
      `);
  
      return items;
    } catch (error) {
      throw error;
    }
  }

  async function createItem({ name, price, description }) {
    try {
      const { rows } = await client.query(`
      INSERT INTO items(name, price, description) 
      VALUES($1, $2, $3)  
      RETURNING *;
    `, [name, price, description]);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function updateItem({ 
    id,
    name,
    price,
    image,
    description
  }){
  
    try {
      const { rows: [items] } = await client.query(`
        UPDATE items
        SET name='${name}', price =${price}, description='${description}'
        WHERE id= ${ id }
        RETURNING *;
      `);
      
      return items;
    } catch (error) {
      throw error;
    }
  }

  async function deleteItem(id) {
    try {
        await client.query(`
        DELETE FROM cart
        WHERE "itemId" = ${id};
        `);
        const {rows} = await client.query(`
        DELETE FROM items
        WHERE id=${id};
        `);
        return rows;
    } catch (error) {
        throw error;
    }
  }

  module.exports = {
    getAllItems,
    createItem,
    getItemById,
    updateItem,
    deleteItem
}