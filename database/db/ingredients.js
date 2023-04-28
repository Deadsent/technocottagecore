const client = require("../index")

const createIngredient = async ({name, type, quantity }) => {
    try {
        const {rows: ingredient} = await client.query(`
        INSERT INTO ingredients(name, type, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, type, quantity])
    
        return ingredient 
    } catch (error) {
        console.error(error)
    }
}

const selectAllIngredients = async () => {
    try {
        const {rows} = await client.query(`
        SELECT * FROM ingredients;
        `)
    
        return rows 
    } catch (error) {
        console.error(error)
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
      console.error(error)  
    }
}

const updateIngredient = async (ingredientId, fields = {}) => {
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

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
        console.error(error)
    }
}

module.exports = {
    createIngredient,
    selectAllIngredients,
    selectIngredientById,
    updateIngredient,
    deleteIngredient
}