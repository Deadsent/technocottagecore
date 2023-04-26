const client = require('../index')

const buildTables = () => {
    try {
        client.connect()
        
        console.log("Hello!")
    } catch (error) {
        console.error(error)
    }
}

buildTables()