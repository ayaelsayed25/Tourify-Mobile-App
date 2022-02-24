const Like = require('../Models/Like')
const Notification = require('../Models/Notification')
const Post = require('../Models/Post')

module.exports = {

    addLike: async (req, res) => {
        const email = req.user_id;
        let query = `1`
        Like.create(email, req.body.post_id, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            Post.getOne(req.body.post_id, (err, post) => {
                if (err) {
                    return res.status(500).json(err);
                }
                console.log(post[0].number_of_likes);
                if (post[0].number_of_likes != null) {
                    query = `number_of_likes + 1`;
                }

                Like.increment(query, req.body.post_id, (err) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    if (email !== post[0].email) {
                        Notification.notify(email, post[0].email, req.body.post_id, null, (err) => {
                            if (err) {
                                return res.status(500).json(err);
                            }
                            return res.json();
                        })
                    }
                    else
                        return res.json();
                })
            })
        })
    },

    Dislike: async (req, res) => {
        const email = req.user_id;
        Like.delete(email, req.query.id, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            Like.decrement(req.query.id, (err) => {
                if (err)
                    return res.status(500).json(err);

                Notification.deleteLikeNotification(req.query.id, email)
                return res.json();
            })
        })
    },
}