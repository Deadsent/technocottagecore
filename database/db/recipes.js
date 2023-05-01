const client = require("../index");
const { createSetString } = require("../utils");

const createRecipe = async ({ title, description, userId }) => {
  try {
    const { rows: newRecipe } = await client.query(
      `
            INSERT INTO recipes(title, description, "userId")
            VALUES($1, $2, $3)
            RETURNING *;
        `,
      [title, description, userId]
    );

    return newRecipe;
  } catch (error) {
    throw error;
  }
};

module.exports = { createRecipe };
