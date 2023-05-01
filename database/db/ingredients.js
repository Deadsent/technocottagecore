const client = require("../index")
const { createSetString } = require("../utils")

const createIngredient = async ({name, type, quantity, userId }) => {
    try {
        const {rows: ingredient} = await client.query(`
        INSERT INTO ingredients(name, type, quantity, "userId")
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, type, quantity, userId])
    
        return ingredient 
    } catch (error) {
        throw error
    }
}

const selectAllIngredients = async () => {
    try {
        const {rows} = await client.query(`
        SELECT * FROM ingredients;
        `)
    
        return rows 
    } catch (error) {
        throw error
    }
}

const selectIngredientById = async (id) => {
    try {
        const {rows: [ingredient]} = await client.query(`
        SELECT * FROM ingredients
        WHERE id = $1
        `, [id])
    
        return ingredient
    } catch (error) {
      throw error  
    }
}

const updateIngredient = async (ingredientId, fields = {}) => {
    const setString = createSetString(fields)
    try {
        if (setString.length > 0) {
            await client.query(
              `
              UPDATE ingredients
              SET ${setString}
              WHERE id=${ingredientId}
              RETURNING *;
              `,
              Object.values(fields)
            );
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteIngredient = async (ingredientId) => {
    try {
        await client.query(`
        DELETE FROM ingredients 
        WHERE id = $1
        `, [ingredientId])
    } catch (error) {
        throw error
    }
}

const selectIngredientsByUserId = async (userId) => {
    try {
        const {rows: userIngredients} = await client.query(`
        SELECT * FROM ingredients
        WHERE "userId" = $1
        `, [userId])
        return userIngredients
    } catch (error) {
        throw error
    }
}

module.exports = {
    createIngredient,
    selectAllIngredients,
    selectIngredientById,
    updateIngredient,
    deleteIngredient,
    selectIngredientsByUserId
}