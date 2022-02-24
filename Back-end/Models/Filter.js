const express = require('express');
const router = express.Router();
const auth = require("../Middleware/authentication")
let PostController = require('../Controllers/PostController');

// router.post('/createComment', FilterController.createController);

module.exports = router;