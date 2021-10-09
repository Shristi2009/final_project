const {
  getAllUsers,
      createUser, 
      getUserById, 
      getUserByUsername
} = require('./users')

const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem
} = require('./items')
const {getCartById,
  createCart,
  removeItem,
  deleteCart,
  getCartByUsersId
 
} = require('./cart')

// and export them
module.exports = {
  getAllUsers,
      createUser, 
      getUserById, 
      getUserByUsername,
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  getCartById,
  createCart,
  removeItem,
  deleteCart,
  getCartByUsersId
}