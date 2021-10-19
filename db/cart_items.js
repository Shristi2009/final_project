const client= require('./client');
async function addItemToCart({cartId, itemsId, quantity}) {
    try {
        const {rows: [cartItem]} = await client.query(`
            INSERT INTO cart_items("cartId", "itemsId", quantity)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [cartId, itemsId, quantity]);
        return cartItem;
    } catch (error) {
        throw error;
    }
}

async function getCartItemById(id) {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM cart_items
            WHERE id=${id}
        
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function updateCartItem({id, quantity}) {
    try {
        const {rows: [cartItem]} = await client.query(`
            UPDATE cart_items
            SET quantity=${quantity}, modified_at= NOW()
            WHERE id=${id}
            RETURNING *;
        `);
        return cartItem;
    } catch (error) {
        throw error;
    }
}

async function getItemsByCartId(id) {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM cart_items
            WHERE "cartId" = ${id}
            RETURNING *;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function destroyCartItem(id) {
    try {
        const {rows} = await client.query(`
            DELETE FROM cart_items
            WHERE id = ${id};
        `);
        rows.id = id;
        return rows;
    } catch (error) {
        throw error;
    }
}

async function clearCart(id) {
    try {
        const {rows} = await client.query(`
            DELETE FROM cart_items
            WHERE "cartId" = ${id}
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addItemToCart,
    getCartItemById,
    updateCartItem,
    getCartItemById,
    destroyCartItem,
    getItemsByCartId,
    clearCart
}
