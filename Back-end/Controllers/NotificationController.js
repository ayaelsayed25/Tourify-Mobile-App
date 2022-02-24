const Notify = require('../Models/Notification')
const Account = require('../Models/Account')
module.exports = {

    getNotifications: (req, res) => {

        const reciever_id = req.user_id

        console.log("Get All Notifications:")
        console.log({ reciever_id })

        Notify.findAll(reciever_id, (err, notifications) => {

            if (err)
                return res.status(500).json(err);

            console.log({ notifications })

            var query = ` notifications_count = 0 `;

            Account.editUser(reciever_id, query, (err) => {
                if (err)
                    return res.status(500).json(err);

                else
                    return res.send(notifications);


            })
        })

    },

    readNotification: (req, res) => {

        const id = req.params.id

        console.log("Read Notification")
        console.log(id)

        Notify.markAsRead(id, (err) => {

            if (err)
                return res.status(500).json(err);

            console.log("Successfully Viewed!")
            

            return res.status(200).json({ message : "Successfully Viewed!"});
        })
    },
}