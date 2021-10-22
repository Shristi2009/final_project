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
    inProcess,
    quantity
    
  }) {
    try {
      const { rows: [ cart ] } = await client.query(`
        INSERT INTO cart("usersId", "itemsId", quantity) 
        VALUES($1, $2, $3)
        RETURNING *;
      `, [usersId, itemsId, quantity]);
  
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
  async function getCartAndItemsByUserId(usersId) {
    try {
      
  
      const {rows:[items]} = await client.query(`
        SELECT * FROM items
        JOIN cart ON "itemsId" = items.id
        WHERE "usersId" = ${usersId};
      `);
      
      return items;
    } catch (error) {
      throw error;
    }
  }

  async function cartcheckout({ 
    id,
    processed, 
    inProcess,
    
    
  }) {
    try {
if(processed) {
    const {rows: [cartProcessed]} = await client.query(`
    UPDATE cart
    SET "inProcess"=$1, processed=$2 
    WHERE id=${id}
    RETURNING *;
`, [inProcess, processed]);
return cartProcessed;
} 
  
    } catch (error) {
      throw error;
    }
  }

  async function editCart({ 
    id,
    quantity,
    itemsId
    
  }) {
    try {
    
//     const {rows: [updatedRoutine]} = await client.query(`
//     UPDATE cart SET
//   quantity = COALESCE(NULLIF('${quantity}', ''), quantity),
  
//   WHERE id = ${id}
//     RETURNING *;
// `);
// return updatedRoutine;
if (quantity>0){
const {rows: [updatedQuantity]} = await client.query(`
UPDATE cart
SET quantity=$1, 
WHERE id=${id}
RETURNING *;
`, [quantity]);
return updatedQuantity;
}else{
  await removeItem(itemsId);
}

    
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
    getAllCarts,
    getCartAndItemsByUserId,
    editCart,
    cartcheckout
}