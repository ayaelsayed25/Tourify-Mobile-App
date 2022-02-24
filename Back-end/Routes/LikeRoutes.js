const express = require('express');
const router = express.Router();
const auth = require("../Middleware/authentication")
let LikeController = require('../Controllers/LikeController');

router.post('/like',auth, LikeController.addLike);
router.delete('/dislike',auth, LikeController.Dislike);

module.exports = router;