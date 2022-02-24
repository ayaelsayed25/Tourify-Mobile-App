const { is } = require('express/lib/request');
const pool = require('../DB/pool');
const Post = require('../Models/Post')
const PostLocation = require('../Models/PostLocation')
const PostPhoto = require('../Models/PostPhoto')
const PostTags = require('../Models/PostTags')
const Comment = require('../Models/Comment')
const Like = require('../Models/Like')
const {uploadPhotosToAzure} = require('../Services/PhotoUpload')
const atob = require('atob')
const moment = require('moment')

module.exports = {

   // getFeedPosts: (req, res) => {
   //    let limit = req.query.limit || 100;
   //    let offset = req.query.offset || 0;

   //    if (!req.user_id)
   //       res.status(403)

   //    let query = `user.email != '${req.user_id}'`;

   //    Post.findAll(query, limit, offset, (err, posts) => {
   //       if (err)
   //          return res.status(500).json(err);
   //       posts = formatPostsDate(posts)
   //       console.log("Rrrrrr")
   //       // console.log(posts)
   //       return res.send(posts);
   //    })

   // },
   getFeedPosts: (req, res) => {
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;
      let tagQuery='';
      let filterQuery='';

      if (!req.user_id)
         res.status(403)

      let query = `user.email != '${req.user_id}' `;

    
      tags=req.body.tags;
      for(var i in tags ){
         if(i==0)
             tagQuery+= "natural join ";
         console.log(tags[i]);
         tagQuery+=`( SELECT post_id FROM PostTags where ( tag_name = "${tags[i]}" ) ) as ${tags[i]} `
         if(tags.length-i>1)
             tagQuery+= " natural join ";

      }

      if(req.body.numberOfDays){
         filterQuery+=` duration =  ${parseInt(req.body.numberOfDays)}`;
      }
      if(req.body.organization){
         if(filterQuery.length>0)
            filterQuery+= " AND ";
         filterQuery+=`organisation = '${req.body.organization}'`;
      }
      if(req.body.rate){
         if(filterQuery.length>0)
             filterQuery+= " AND " ;
         filterQuery+=`rate = ${req.body.rate}`;
      }
      if(req.body.budget){
         if(filterQuery.length>0)
             filterQuery+= " AND ";
         filterQuery+=`budget <= ${ parseInt(req.body.budget)} AND currency = '${req.body.currency}' `;
      }

      Post.findAll(query,tagQuery, filterQuery,limit, offset, (err, posts) => {
         if (err)
            return res.status(500).json(err);
         posts = formatPostsDate(posts)
         console.log("MAMA")
         // console.log(posts)
         return res.send(posts);
      })

   },
   getProfilePosts: (req, res) => {
      let limit = req.query.limit || 100;
      let offset = req.query.offset || 0;

      let query = `user.email = '${req.user_id}'`;

      Post.findAll(query, "", "", limit, offset, (err, posts) => {

         if (err)
            return res.status(500).json(err);
         posts = formatPostsDate(posts)
         return res.status(200).json(posts);
      })

   },

   getFeedPostsCount: (req, res) => {
      let query = `user.email != '${req.user_id}'`;
      Post.count(null, (err, count) => {

         if (err)
            return res.status(500).json(err);

         return res.json(count);


      })

   },

   deletePost: (req, res) => {
      Post.getOne(req.query.id, (error, post) => {

         if (error)
            return res.status(500).json(err);

         if (!post || !post.length || post[0].email != req.user_id) {

            return res.status(401).json({ error: true, msg: "post doen't exist or that post doesn't belong to the loged user" });

         }
         Post.delete(req.query.id, (err) => {

            if (err)
               return res.status(500).json(err);
            return res.json();


         })
      })

   },


   getPost: (req, res) => {
      const post_id = req.params.id;

      Post.findOne(post_id, (err, post) => {
         if (err){
            console.log(err);
            return res.status(500).json(err);
         }
         return res.send(post);
      })

   },

   createPost: async (req, res) => {
      console.log("hi")
      const email = req.user_id;
      console.log({ email })
      var post_id;
      console.log("hi from photos")
      await Post.createPost(email, req.body, (err, post) => {
         post_id = post.insertId;
      })
         .then(() => {
            uploadPhotosToAzure(req.body.photos)
            PostPhoto.createPostPhoto(post_id, req.body.photos)
            PostLocation.createPostLocation(post_id, req.body)
            PostTags.createPostTags(post_id, req.body.tags)
            console.log(post)
            return
         })
         .then(() => { return res.status(200).json({}) })

         .catch((err) => {
            return res.status(500).json(err);
         });

   },

   editPost: async (req, res) => {
      console.log("received");
      const post_id = req.body.postId;
      console.log(req.body.photos)
      // console.log(req.body.deletedPhotos)
      await Post.editPost(req.body)
         .then(() => {
            uploadPhotosToAzure(req.body.photos)
            PostPhoto.deletePostPhoto(post_id, req.body.deletedPhotos)
            PostPhoto.createPostPhoto(post_id, req.body.photos)
            PostTags.deletePostTags(post_id, req.body.deletedTags)
            PostTags.createPostTags(post_id, req.body.tags)
            // PostLocation.editPostLocation(post_id, req.body)
            console.log(post_id)
            return
         })

         .then(() => { return res.json(); })

         .catch((err) => {
            return res.status(500).json(err);
         });

   },

   viewPost: (req, res) => {
      const post_id = req.query.id;
      
      Post.findOne(post_id, (err, post) => {
         if (err){
            console.log(err);
            return res.status(500).json(err);
         }
         let temp = formatPostsDate([post])
         post = temp[0]
         Comment.getAll(post_id, (err, comments) => {

            if (err){
               return res.status(500).json(err);
            }
            comments = formatPostsDate(comments)

            const email = req.user_id;
            comments.forEach(c=>{
               if(c.email==email)
                  c.ownerFlag =true
            })
            Like.getAll(post_id, (err, likes) => {
               if (err){
                  return res.status(500).json(err);
               }
               likes.forEach(c => {
                  if (c.email == email)
                     post.likeFlag = true
               })
               post.post_id = post_id
               console.log({post,comments,likes});
               return res.send({post,comments,likes});
            })
         })
      })
    
   },
    
}

function formatPostsDate(posts) {
   let asOfDate = moment(new Date())


   posts.forEach(p => {
      let pDate = moment(p.created_at)
      var diff = asOfDate.diff(pDate);
      if (diff < 24 * 60 * 60 * 1000) {// less than 24 diff
         if (diff < 60 * 60 * 1000) {
            p.created_at = 'less than 1h'
            p.created_at = moment(diff).format("mm") + "m"
            p.created_at = p.created_at.charAt(0) == '0' ? p.created_at.substring(1) : p.created_at
         }
         else {
            p.created_at = moment(diff).format("hh") + "h"
            p.created_at = p.created_at.charAt(0) == '0' ? p.created_at.substring(1) : p.created_at
         }
      } else {
         p.created_at = moment(p.created_at).format("MMM Do")
      }

   })
   return posts;
}