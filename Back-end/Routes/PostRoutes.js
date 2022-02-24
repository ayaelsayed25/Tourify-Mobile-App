const express = require('express');
const router = express.Router(); 
const auth = require("../Middleware/authentication")
let PostController = require('../Controllers/PostController');

router.post('/TripCreation', auth, PostController.createPost);
router.post('/Edit', auth, PostController.editPost);
router.get('/:id/:token', PostController.getPost);
router.post('/feed', auth, PostController.getFeedPosts);
router.get('/feedCount', auth, PostController.getFeedPostsCount);
router.delete('/delete', auth, PostController.deletePost);
router.get('/profilePosts', auth, PostController.getProfilePosts);
router.get('/viewPost', auth, PostController.viewPost);

module.exports = router; 