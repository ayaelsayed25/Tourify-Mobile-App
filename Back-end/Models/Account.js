const DB = require("../DB/pool");
const tableName = 'user';
module.exports = {

    tableName: tableName,



    findEmail: async (email, cb) => {

        email = email || '';

        let selectQuery = `SELECT * FROM ${tableName} WHERE email = "${email}" ;`;

        try {
            let user = await DB(selectQuery)
            // console.log("user : ", user)
            return cb(null, user);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }


    },

    getPassword: async (email, cb) => {

        email = email || '';

        let selectQuery = `SELECT password FROM ${tableName} WHERE email = "${email}" ;`;

        try {
            let pass = await DB(selectQuery)
            return cb(null, pass[0].password);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }
    },


    create: async (account, cb) => {

        let insertQuery = `INSERT INTO ${tableName} 
                            (email, name, password, photo, country, google) 
                            VALUES  ("${account.email}","${account.name}",
                                        ${account.password},"${account.photo}",
                                        ${account.country}, ${account.googleBool}) ;`;
        console.log(insertQuery);
        try {
            let user = await DB(insertQuery)
            console.log("inserted account : ", user)
            return cb(null, user);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }


    },


    editUser: async (email, query, cb) => {

        let editQuery = `UPDATE ${tableName} 
                            SET  ${query} 
                            WHERE email = "${email}" ;`;

        try {
            let res = await DB(editQuery)
            console.log("edited account : ", email)
            return cb(null, res);
        }
        catch (e) {
            console.log(e)
            return cb(e, null);
        }

    },

    saveNotificationToken: (email, token, cb) => {

        let updateQuery = `UPDATE ${tableName} 
                            SET notify_token = '${token}'
                            WHERE email = '${email}'`

        try {
            console.log(DB(updateQuery))
            return cb(null)
        }
        catch (e) {
            return cb(e)
        }
    },

    getNotificationToken: async (email, cb) => {
        let selectQuery = `SELECT notify_token,name
                            FROM ${tableName} 
                            WHERE email = "${email}" ;`;
        try {
            let token = await DB(selectQuery)
            console.log(token[0])
            return cb(null, token[0]);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }
    },

    getNotificationsCount: async (email, cb) => {
        let selectQuery = `SELECT notifications_count 
                            FROM ${tableName} 
                            WHERE email = "${email}" ;`;
        try {
            let count = await DB(selectQuery)
            console.log(count[0].notifications_count)
            return cb(null, count[0].notifications_count);

        } catch (e) {
            console.log(e)
            return cb(e, null);

        }
    },

    incrementNotificationsCount: async (email, cb) => {
        var query = ` notifications_count = notifications_count + 1`;
        let editQuery = `UPDATE ${tableName} 
                            SET  ${query} 
                            WHERE email = "${email}" ;`;

        try {
            let res = await DB(editQuery)
            console.log("edited account : ", email)
            return cb(null, res);
        }
        catch (e) {
            console.log(e)
            return cb(e, null);
        }

    }

}