const Comment = require('../Models/Comment')
const Notification = require('../Models/Notification')
const Post = require('../Models/Post')

module.exports = {

   createComment: async (req, res) => {
      const email = req.user_id;
      let query = `1`
      Comment.create(email,req.body, (err, comment) => {
      console.log("comment creation")
      console.log(req.body)

      Comment.create(email, req.body, (err, comment) => {
         if (err) {
            return res.status(500).json(err);
         }
         comment_id = comment.insertId;
         Post.getOne(req.body.post_id, (err, post) => {
            if (err) {
               return res.status(500).json(err);
            }
            console.log(post[0].number_of_comments);
            if (post[0].number_of_comments != null) {
               query = `number_of_comments + 1`;
            }
            Comment.increment(query, req.body.post_id, (err) => {
               if (err) {
                  return res.status(500).json(err);
               }
               if (email !== post[0].email) {
                  Notification.notify(email, post[0].email, req.body.post_id, comment_id, (err) => {
                     if (err) {
                        return res.status(500).json(err);
                     }
                     return res.json({ comment_id: comment_id});
                  })
               }
               else
                  return res.json({ comment_id: comment_id});
            })

         })
      })

   })
},


   editComment: async (req, res) => {
      Comment.getOne(req.body.comment_id,(error, comment)=>{
  
         if(error)
            return res.status(500).json(error);
         
         if (!comment|| !comment.length || comment[0].email != req.user_id){
   
            return res.status(401).json({ error:true ,msg: "comment doen't exist or that comment doesn't belong to the loged user" });
   
         }
         Comment.edit(req.body, (err, comment) => {

            if (err) {
               return res.status(500).json(err);
            }
            
            console.log(comment);
            return res.status(200).json(comment);
         })
      })
   },



   deleteComment: (req, res) => {
      console.log("inside  dele")
      Comment.getOne(req.query.id, (error, comment) => {

         if (error)
            return res.status(500).json(err);

         if (!comment || !comment.length || comment[0].email != req.user_id) {

            return res.status(401).json({ error: true, msg: "comment doen't exist or that comment doesn't belong to the loged user" });

         }
         Comment.delete(req.query.id, (err) => {

            if (err)
               return res.status(500).json(err);

            Comment.decrement(req.query.id, (err) => {
               if (err)
                  return res.status(500).json(err);
               
               return res.json();
            })
         })
      })

   },

   //   comment: (req, res) => {
   //      Account.findEmail(email, (err, user) => {

   //          if (err) {
   //              return res.status(500).json(err);

   //          }
   //          if (user.length == 0) {
   //              return res.status(404).json({ message: "user not found" });
   //          }
   //          else {
   //              // check
   //              const name = user.name
   //              const message = {
   //                  to: pushToken,
   //                  sound: 'default',
   //                  body: `'${name} commented on your post'`,
   //                  data: { post_id: req.post_id, comment_id: #TODO },
   //              }
   //              //get notification token of owner from post id
   //              //insert notification into database
   //              const pushToken = ''
   //              Notification.sendNotification([pushToken], message)
   //          }
   //      });


   //  }


}