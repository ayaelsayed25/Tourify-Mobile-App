const express = require('express');
const accountController = require('../Controllers/AccountController');
const auth = require("../Middleware/authentication")
const router = express.Router();

router.post('/login', accountController.login);
router.post('/signup',accountController.signup);
router.get('/userProfile', auth, accountController.getUserProfile);
router.put('/updateCountry', auth, accountController.updateCountry);
router.put('/updateBio', auth, accountController.updateBio);



module.exports = router;