const {
  getAllUsers,
  createUser,
  createItem,
  createCart,
  getAllCarts,
  editUser
  
} = require('./index');

const client = require('./client');
const { getAllItems } = require('./items');



async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    
      DROP TABLE IF EXISTS cart cascade;
      DROP TABLE IF EXISTS items cascade;
      DROP TABLE IF EXISTS users cascade;

    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}



async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      active BOOLEAN DEFAULT false,
      admin BOOLEAN DEFAULT false,
      "firstName" varchar(255) NOT NULL, 
      "lastName" varchar(255) NOT NULL,
      location varchar(255) NOT NULL
    );
  `);


//ASK SHANNON. HOW TO GET CURRENCY DECIMALS IN PRICE?
  await client.query(`
  CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    price DECIMAL(3,2), 
    description varchar(255) NOT NULL,
    picture varchar(255)
  );
`);
// items table needs usersid and cartid
// ASK SHANNON. BOOLEAN DEFAULTs not working, null in table
    await client.query(`
    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "usersId" INTEGER REFERENCES users(id),
      "itemsId" INTEGER REFERENCES items(id),
      processed BOOLEAN DEFAULT false, 
      "inProcess" BOOLEAN DEFAULT true,
      quantity INTEGER
    );
  `);
  
 
//ask shannon about image in database




    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({ username: 'albert', password: 'bertie99', firstName: 'Albert', lastName: 'Johnson', location: 'St. Louis, MO' });
    const john = await createUser({ username: 'john', password: 'admintest', firstName: 'John', lastName: 'Doe', location: 'Oklahoma City, OK' });
    const skip = await createUser({ username: 'skip', password: 'skippassword', firstName: 'Skip', lastName: 'Allthetime', location: 'Norman, OK' });
    const admin = await createUser({ username: 'admin', password: 'password123', firstName: 'The', lastName: 'Administrator', location: 'Kansas City, MO' });



    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialItems() {
  try {
    console.log("Starting to create items...");

    const captainCrunch = await createItem({ name: 'Captian Crunch', price: 3, description: "Sweet and golden, with a crunch you’ll love, nothing competes with the original Cap’n Crunch.", picture: "captian_crunch.jpg" });
    const cheerios = await createItem({ name: 'Cheerios', price: 3, description: "Our delicious O’s are made from whole grain oats which contain beta-glucan, a soluble fiber that can help lower cholesterol as part of a heart-healthy diet.* Pick up a Cheerios cereal box today and begin your happy heart journey.", picture: "cheerios.jpg" });
    const frostedFlakes = await createItem({ name: 'Frosted Flakes', price: 3, description: "Kellogg's Frosted Flakes consist of crunchy flakes perfectly coated with sweetened frosting gives every morning a great start.", picture: "frosted_flakes.jpg"  });



    console.log("Finished creating items!");
  } catch(error) {
    console.error("Error creating items!");
    throw error;
  }
}

async function createInitialCarts() {
  try {
    console.log("Starting to create carts...");

    await createCart({ usersId: 1, itemsId: 1,quantity: 3 });
    await createCart({ usersId: 1, itemsId: 2,  quantity: 1});
    await createCart({ usersId: 2, itemsId: 3, quantity: 1});



    console.log("Finished creating carts!");
  } catch(error) {
    console.error("Error creating carts!");
    throw error;
  }
}


async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialItems();
    await createInitialCarts();
    await editUser();
    
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    const items = await getAllItems();
    console.log("getAllItems:", items);

    const carts = await getAllCarts();
    console.log("getAllCarts:", carts);
    
    
    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

