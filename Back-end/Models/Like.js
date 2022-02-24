const DB = require("../DB/pool");
const tableName = 'Likes';

module.exports = {

    tableName: tableName,

    create: async (email, post_id, cb) => {
        let insertQuery = `INSERT INTO ${tableName} 
            (post_id,email) VALUES
            (${post_id},"${email}") ;`;
        try {
            let res = await DB(insertQuery)
            console.log(res)
            return cb(null);

        } catch (e) {
            console.log(e)
            return cb(e);
        }
    },
    
    increment: async (query,post_id, cb) => {
        
        let updateQuery = `UPDATE Post
            SET number_of_likes = ${query}
            WHERE post_id = ${post_id} ;`;
        try {
            let res = await DB(updateQuery)
            console.log(res)
            return cb(null);

        } catch (e) {
            console.log(e)
            return cb(e);
        }
    },

    delete: async (email, post_id, cb) => {

        let query = `DELETE FROM  ${tableName} WHERE  post_id = ${post_id} AND email = "${email}"; `;
        try {

            await DB(query)
            return cb(null);

        } catch (e) {
            console.log(e)
            return cb(e);

        }
    },

    decrement: async (post_id, cb) => {
        let updateQuery = `UPDATE Post
            SET number_of_likes = number_of_likes - 1
            WHERE post_id = ${post_id} ;`;
        try {
            let res = await DB(updateQuery)
            console.log(res)
            return cb(null);

        } catch (e) {
            console.log(e)
            return cb(e);
        }
    },

    getAll: async (post_id, cb) => {

        let selectQuery = `SELECT user.email , name , photo  FROM ${tableName} Left join user on Likes.email=user.email  WHERE post_id = ${post_id};`;

        try {
            let likes = await DB(selectQuery)
            return cb(null, likes);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }

    },

}
