const table = 'PostLocation';
const DB = require("../DB/pool");
const tableName = 'PostLocation';

module.exports = {

    tableName: tableName,

    createPostLocation: async  (post_id, newPost) => {
        let insertQuery = `INSERT INTO ${tableName}  VALUES
            (${post_id},${newPost.latitude},${newPost.longitude}) ;`;
        try {
            let res = await DB(insertQuery)
            return res
        }
        catch (e) {
            return e
        }
    }, 

    editPostLocation: async  (editedPost) => {
        let editQuery = `UPDATE ${tableName} 
            SET latitude = ${editedPost.latitude} , longitude = ${editedPost.longitude}
            WHERE post_id = ${editedPost.post_id};`
        try {
            let res = await DB(editQuery)
            return res
        }
        catch (e) {
            return e
        }
    }
}


