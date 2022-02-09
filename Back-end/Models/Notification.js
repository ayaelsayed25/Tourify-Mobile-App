const DB = require("../DB/pool");
const Notification = require('../Services/SendNotification')
const Account = require('../Models/Account');
const { reject } = require("async");
const tableName = 'Notification';

module.exports = {

    tableName: tableName,

    findAll: async (receiver_email, cb) => {

        let selectQuery = `SELECT 
                                ${tableName}.id, ${tableName}.comment_id, user.name,
                                ${tableName}.post_id, ${tableName}.sender_email, user.photo,
                                ${tableName}.viewed, ${tableName}.created_at
                            FROM 
                                (${tableName} JOIN user 
                                            ON ${tableName}.sender_email = user.email)
                            WHERE 
                                receiver_email = '${receiver_email}' 
                            ORDER BY 
                                created_at DESC;`

        try {

            let notifications = await DB(selectQuery)
            return cb(null, notifications)
        }
        catch (e) {
            return cb(e, null)
        }
    },

    addNotification: async (post_id, sender_email, receiver_email, comment_id = null) => {

        if (sender_email === receiver_email) return

        let insertQuery = `INSERT INTO
                                    ${tableName} (post_id, sender_email,
                                                receiver_email, comment_id, viewed)
                            VALUES  
                                    (${post_id}, '${sender_email}', 
                                    '${receiver_email}', ${comment_id}, false) ;`;
        try {
            return DB(insertQuery)
        }
        catch (e) {
            reject(e)
        }
    },

    markAsRead: async (notification_id, cb) => {

        let deleteQuery = `UPDATE 
                                ${tableName}  
                            SET 
                                viewed = true
                            WHERE 
                                id = ${notification_id};`;

        console.log({ deleteQuery })

        try {
            DB(deleteQuery)
            return cb(null)
        }
        catch (e) {
            return cb(e)
        }
    },

    notify: async (sender_email, receiver_email, post_id, comment_id, cb) => {
        Account.getNotificationToken(receiver_email, (err, user) => {
            console.log({ err })
            if (!err) {
                let body = ''
                if (comment_id !== null)
                    body = `${user.name} commented on your trip`
                else
                    body = `${user.name} liked your trip review`

                const message = {
                    to: user.notify_token,
                    sound: 'default',
                    body: body,
                    data: { post_id: post_id, comment_id: comment_id },
                }

                try {
                    console.log("SENDINGGGG")
                    Notification.sendNotification([user.notify_token], message);
                    const res = this.addNotification(post_id, sender_email, receiver_email, comment_id)
                    return cb(null, res);
                }
                catch (e) {
                    return cb(e, null);
                }
            }
            else
                return cb(err, null);
        })
    }
}


