const {
  getAllUsers,
  createUser
} = require('./users')

const {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem
} = require('./items')

// and export them
module.exports = {
  getAllUsers,
  createUser,
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem
}