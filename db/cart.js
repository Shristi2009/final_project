const client= require('./client');

async function getAllCarts() {
  const { rows } = await client.query(
    `SELECT *
    FROM cart;
  `);

  return rows;
}


async function createCart({ 
    usersId, 
    itemsId,
    processed,
    inProcess
    
  }) {
    try {
      const { rows: [ cart ] } = await client.query(`
        INSERT INTO cart("usersId", "itemsId", processed, "inProcess") 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [usersId, itemsId, processed, inProcess]);
  
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async function getCartById(id) {
    try {
      const { rows: [ cart ] } = await client.query(`
        SELECT *
        FROM cart
        WHERE id=${ id }
      `);
      //console.log("GET ROUTINE BY ID" ,cart); 
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async function getCartByUsersId(usersId) {
    try {
      const { rows: [ cart] } = await client.query(`
        SELECT *
        FROM cart
        WHERE id=${ usersId }
      `);
    
  
      
      return cart;
    } catch (error) {
      throw error;
    }
  }



  
  
  async function deleteCart (id) {
    try {
        
       await client.query(`
        DELETE 
        FROM cart
        WHERE id=${id}
      `);
    
    
     
    } catch (error) {
      throw error;
    }
  }

  async function removeItem (itemsId) {
    try {
        
       await client.query(`
        DELETE 
        FROM cart
        WHERE "itemsId"=${itemsId}
      `);
    
    
     
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getCartById,
    createCart,
    removeItem,
    deleteCart,
    getCartByUsersId,
    getAllCarts
}