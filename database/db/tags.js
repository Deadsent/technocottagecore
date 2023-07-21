const client = require("../index")
const {createSetString} = require("../utils")

const createTags = async (tagList) => {
    if(tagList.length === 0 || !tagList) return

    const insertValues = tagList.map((_, index) => `$${index + 1}`).join(`), (`)
    const selectValues = tagList.map((_, index) => `$${index + 1}`).join(`, `)
    try {
        await client.query(
            `
          INSERT INTO tags(name)
          VALUES (${insertValues})
          ON CONFLICT (name) DO NOTHING;
          `,
            tagList
          );
      
          const { rows } = await client.query(
            `
          SELECT * FROM tags
          WHERE name
          IN (${selectValues});
          `,
            tagList
          );
      
          return rows;      
    } catch (error) {
        throw error
    }
}

module.exports = {createTags}