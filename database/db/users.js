const client = require('../index')
const { createSetString } = require("../utils")

const createUser = async ({username, password, firstName, lastName, userEmail}) => {
    try {
        const {rows: newUser} = await client.query(`
        INSERT INTO users(username, password, "nameFirst", "nameLast", "userEmail")
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username, "userEmail") DO NOTHING
        RETURNING *;
        `, [username, password, firstName, lastName, userEmail])

        return newUser
    } catch (error) {
        throw error
    }
}

const selectAllUsers = async () => {
    try {
        const {rows} = await client.query(`
        SELECT * FROM users;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const selectUserById = async (id) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE id = $1
        `, [id])
        delete user.password
        return user
    } catch (error) {
        throw error
    }
}

const updateUser = async (userId, fields={}) => {
    try {
        const setString = createSetString(fields)
        if(setString.length > 0){
            await client.query(`
                UPDATE users
                SET ${setString}
                WHERE id=${userId}
                RETURNING *;
              `,
              Object.values(fields)
            )
        }
    } catch (error) {
        throw error
    }
}

const deleteUser = async (userId) => {
    try {
        await client.query(`
            DELETE FROM users
            WHERE id = $1
        `, [userId]) 
    } catch (error) {
        throw error   
    }
}

module.exports = {
    createUser,
    selectAllUsers,
    selectUserById,
    updateUser,
    deleteUser
}