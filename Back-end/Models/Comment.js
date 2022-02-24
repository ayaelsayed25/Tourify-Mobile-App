const DB = require("../DB/pool");
const tableName = 'Comments';

module.exports = {

    tableName: tableName,

    create: async (email, comment, cb) => {
        let insertQuery = `INSERT INTO ${tableName} 
            (post_id,email, body)  VALUES
            (${comment.post_id},"${email}","${comment.body}") ;`;
        try {
            let res = await DB(insertQuery)
            console.log(res)
            return cb(null, res);

        } catch (e) {
            console.log(e)
            return cb(e, null);
        }
    },

    increment: async (query, post_id, cb) => {
        let updateQuery = `UPDATE Post
            SET number_of_comments = ${query}
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

    edit: async (comment, cb) => {
        let editQuery = `UPDATE ${tableName} 
            SET body = "${comment.body}"
            WHERE
            comment_id = ${comment.comment_id};`
        console.log(editQuery)
        try {
            let res = await DB(editQuery)
            console.log(res)
            return cb(null, res);
        }
        catch (e) {
            return cb(e, null);
        }
    },

    delete: async (comment_id, cb) => {

        let query = `DELETE FROM  ${tableName} WHERE  comment_id = ${comment_id} `;

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
            SET number_of_comments = number_of_comments - 1
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

    getOne: async (comment_id, cb) => {
        if (!comment_id)
            return cb({error:true}, null)

        let query = `SELECT * FROM  ${tableName} WHERE  comment_id = ${comment_id} `;

        try {
            let comment = await DB(query)
            return cb(null, comment);

        } catch (e) {
            console.log(e)
            return cb(e, null);
        }
    },

    getAll: async (post_id, cb) => {

        let selectQuery = `SELECT comment_id ,user.email, body, created_at, updated_at , name , photo FROM ${tableName} Left Join user on Comments.email=user.email WHERE post_id = ${post_id};`;

        try {
            let comments = await DB(selectQuery)
            return cb(null, comments);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }

    },


}