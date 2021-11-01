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
    const appleJacks = await createItem({ name: 'Apple Jacks', price: 3, description: "Start your morning with the sweet delicious taste of apples and cinnamon flavor in every bite. Kellogg’s Apple Jacks® Cereal is a delicious part of any balanced breakfast.", picture: "apple_jacks.jpg"  });
    const frootLoops = await createItem({ name: 'Froot Loops', price: 3, description: "Bursting with flavor and a delicious crunch, Kellogg’s® Froot Loops® Cereal is the fruitiest way to start your day.", picture: "froot_loops.jpg"  });
    const kingVitaman = await createItem({ name: 'King Vitaman', price: 3, description: "When it comes to a delicious and nutritious breakfast, King Vitaman rules. The sweet and tasty little crowns pack a royal crunch of corn.", picture: "king_vitaman.jpg"  });
    const luckyCharms = await createItem({ name: 'Lucky Charms', price: 3, description: "Make breakfast magically delicious with Lucky Charms breakfast cereal. Frosted gluten-free oats are paired with yummy marshmallows in all your favorite shapes: hearts, stars, horseshoes, clovers, blue moons, rainbows, red balloons and UNICORNS.", picture: "lucky_charms.jpg"  });
    const raisinBran = await createItem({ name: 'Raisin Bran', price: 3, description: "Wake up with Sunny and the simple goodness of Kellogg's Raisin Bran, a deliciously crafted cereal that helps energize the start of your day.", picture: "raisin_bran.jpg"  });
    const riceChex = await createItem({ name: 'Rice Chex', price: 3, description: "Did you know? Satisfying Rice Chex Cereal was the first mainstream, ready-to-eat, gluten free cereal for breakfast and beyond. A few recipe favorites include Original Chex Mix, Honey-Sriracha Chex Mix and the ever-famous Muddy Buddies.", picture: "rice_chex.jpg"  });
    const honeyNutCheerios = await createItem({ name: 'Honey Nut Cheerios', price: 3, description: "Each box of Honey Nut Cheerios breakfast cereal has the irresistible taste of golden honey and natural almond flavor that your whole family will enjoy.", picture: "honey_nut_cheerios.jpg"  });
    const riceKrispies = await createItem({ name: 'Rice Krispies', price: 3, description: "You've heard that breakfast is the most important meal of the day: a good breakfast every morning assists with maintaining a healthy weight, helps ensure daily proper nutrition, and helps kids concentrate better in school.", picture: "rice_krispies.jpg"  });
    const honeyBunchesOfOats = await createItem({ name: 'Honey Bunches of Oats', price: 3, description: "Honey Bunches of Oats Honey Roasted started it all. Our classic cereal that created the forever iconic flavor lineup of crispy flakes, crunchy oat clusters and a touch of honey.", picture: "honey_bunches_of_oats.jpg"  });
    const fruityPebbles = await createItem({ name: 'Fruity Pebbles', price: 3, description: "Make your morning rock with Fruity PEBBLES. Fruity PEBBLES cereal is a sweetened crispy rice breakfast cereal with intense fruity flavor.", picture: "fruity_pebbles.jpg"  });
    const booBerry = await createItem({ name: 'Boo Berry', price: 3, description: "Limited Edition Boo Berry Cereal. Berry Flavor Frosted Cereal with Monster Marshmallows has 14g of Whole Grain per Serving.", picture: "boo_berry.jpg"  });
    const kix = await createItem({ name: 'Kix', price: 3, description: "Original Kix stays true to the 70-year-old recipe of wholesome grains like whole grain corn. Generations later, kids still love it and parents still approve.", picture: "kix.jpg"  });
    



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

