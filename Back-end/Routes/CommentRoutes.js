const express = require('express');
const router = express.Router();
const auth = require("../Middleware/authentication")
let CommentController = require('../Controllers/CommentController');

router.post('/createComment',auth, CommentController.createComment);
router.post('/editComment',auth, CommentController.editComment);
router.delete('/deleteComment',auth, CommentController.deleteComment);
// router.post('/Comment', auth, CommentController.comment);

module.exports = router;