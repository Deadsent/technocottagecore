const client = require("../index");
const {
  createIngredient,
  selectAllIngredients,
  selectIngredientById,
  updateIngredient,
  deleteIngredient,
  selectIngredientsByUserId,
} = require("./ingredients");

const {
  createUser,
  selectUserById,
  selectAllUsers,
  updateUser,
  deleteUser,
} = require("./users");

const {createRecipe} = require("./recipes")

const buildTables = async () => {
  try {
    client.connect();
    console.log("Starting to Drop Tables");
    await client.query(`
        DROP TABLE IF EXISTS recipe_ingredients;
        DROP TABLE IF EXISTS recipe_tags;
        DROP TABLE IF EXISTS recipes;
        DROP TABLE IF EXISTS ingredients;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS users;
        `);
    console.log("Finished Dropping Tables");

    console.log("Starting To Build Tables");
    await client.query(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "nameFirst" VARCHAR(255) NOT NULL,
        "nameLast" VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        "userEmail" VARCHAR(255) NOT NULL,
        UNIQUE (username, "userEmail")
    );
    CREATE TABLE ingredients(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) NOT NULL,
        name VARCHAR(255) UNIQUE NOT NULL,
        type VARCHAR(50) NOT NULL,
        quantity INTEGER DEFAULT 0
    );
    CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
    );
    CREATE TABLE recipes(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        "userId" INTEGER REFERENCES users(id) NOT NULL,
        description TEXT NOT NULL,
        "ingredientId" INTEGER REFERENCES ingredients(id),
        "tagsId" INTEGER REFERENCES tags(id),
        "isPublic" BOOLEAN DEFAULT false
    );
    CREATE TABLE recipe_ingredients(
        id SERIAL PRIMARY KEY,
        "ingredientId" INTEGER REFERENCES ingredients(id),
        "recipeId" INTEGER REFERENCES recipes(id),
        UNIQUE ("ingredientId", "recipeId")
    );
    CREATE TABLE recipe_tags(
        id SERIAL PRIMARY KEY,
        "recipeId" INTEGER REFERENCES recipes(id),
        "tagsId" INTEGER REFERENCES tags(id),
        UNIQUE ("recipeId", "tagsId")
    );
        `);
    console.log("Finished Building Tables");
  } catch (error) {
    throw error;
  }
};

const createInitialIngredients = async () => {
  try {
    console.log("Starting to create ingredients");
    await createIngredient({
      name: "lettuce",
      type: "vegetable",
      quantity: 1,
      userId: 1,
    });
    await createIngredient({
      name: "tallow",
      type: "fat",
      quantity: 1,
      userId: 1,
    });
    await createIngredient({
      name: "apple",
      type: "fruit",
      quantity: 1,
      userId: 1,
    });
    await createIngredient({
      name: "salt",
      type: "seasoning",
      quantity: 1,
      userId: 1,
    });
    await createIngredient({
      name: "broccoli",
      type: "vegetable",
      quantity: 1,
      userId: 1,
    });
    await createIngredient({
      name: "butter",
      type: "fat",
      quantity: 1,
      userId: 1,
    });
    await createIngredient({
      name: "blueberries",
      type: "fruit",
      quantity: 1,
      userId: 1,
    });
    await createIngredient({
      name: "pepper",
      type: "seasoning",
      quantity: 1,
      userId: 1,
    });
    console.log("Finished creating ingredients!")
  } catch (error) {
    throw error;
  }
};

const createInitialUsers = async () => {
  try {
    console.log("Starting to create users!");
    await createUser({
      username: "Deadsent",
      password: "Deadman2",
      firstName: "Chloe",
      lastName: "Henderson",
      userEmail: "thedeadsent@gmail.com",
    });
    console.log("Finished creating users!")
  } catch (error) {
    throw error;
  }
};

const createInitialRecipes = async () => {
  try {
    console.log("Starting to create recipes!")
    await createRecipe({title: "Lorum Ipsum", description: "Dolor Est", userId: 1})
    console.log("Finished creating recipes!")
  } catch (error) {
    throw error;
  }
};

const initSeed = async () => {
  try {
    await buildTables();
    await createInitialUsers();
    await createInitialIngredients();
    await createInitialRecipes();
  } catch (error) {
    throw error
  }
};

initSeed()
  .catch(console.error)
  .then(() => client.end());
