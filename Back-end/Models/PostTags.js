const table = 'PostTags';
const DB = require("../DB/pool");
const tableName = 'PostTags';


module.exports = {

    tableName: tableName,

    createPostTags: async  (post_id, tags) => {
        console.log(tags)
        try {
            await tags.forEach(t = (tag) => {
                let insertQuery = `INSERT INTO ${tableName}  VALUES  (${post_id}, '${tag}') ;`;
                console.log({insertQuery})
                DB(insertQuery)
            });
            return
        }
        catch (e) {
             return e
        }
    },

    deletePostTags: async  (post_id,tags) => {
        console.log(tags)
        try {
            await tags.forEach(t = (tag) => {
                let deleteQuery = `DELETE FROM ${tableName} WHERE post_id = ${post_id} AND tag_name = '${tag}';`;
                console.log({deleteQuery})
                DB(deleteQuery)
            });
        }
        catch (e) {
            return e
        }
     }
}