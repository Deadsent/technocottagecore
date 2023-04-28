const client = require("../index");
const {
  createIngredient,
  selectAllIngredients,
  selectIngredientById,
  updateIngredient,
  deleteIngredient
} = require("./ingredients");

const buildTables = async () => {
  try {
    client.connect();
    console.log("Starting to Drop Tables");
    await client.query(`
        DROP TABLE IF EXISTS ingredients;
        DROP TABLE IF EXISTS recipes;
        `);
    console.log("Finished Dropping Tables");

    console.log("Starting To Build Tables");
    await client.query(`
        CREATE TABLE recipes(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(500)NOT NULL
        );

        CREATE TABLE ingredients(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            type VARCHAR(255) NOT NULL,
            quantity INTEGER DEFAULT 0
        );
        `);
    console.log("Finished Building Tables");
  } catch (error) {
    console.error(error);
  }
};

const createInitialIngredients = async () => {
    try {
        await createIngredient({ name: "lettuce", type: "vegetable", quantity: 1 });
        await createIngredient({ name: "tallow", type: "fat", quantity: 1 });
        await createIngredient({ name: "apple", type: "fruit", quantity: 1 });
        await createIngredient({ name: "salt", type: "seasoning", quantity: 1 });
        await createIngredient({ name: "broccoli", type: "vegetable", quantity: 1 });
        await createIngredient({ name: "butter", type: "fat", quantity: 1 });
        await createIngredient({ name: "blueberries", type: "fruit", quantity: 1 });
        await createIngredient({ name: "pepper", type: "seasoning", quantity: 1 });
        
        const pantry = await selectAllIngredients()
        console.log("Here's our pantry ->", pantry)
    } catch (error) {
        console.error(error)
    }

};

const createInitialRecipes = async () => {
    try {
        
    } catch (error) {
        console.error(error)
    }

};

const initSeed = async () => {
    try {
        await buildTables();
        await createInitialIngredients();
    } catch (error) {
        console.error(error)
    }
};

initSeed();
