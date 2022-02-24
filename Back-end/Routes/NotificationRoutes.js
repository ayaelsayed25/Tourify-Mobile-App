const express = require('express');
const notificationController = require('../Controllers/NotificationController')
const router = express.Router();
const auth = require("../Middleware/authentication")

router.get('/', auth, notificationController.getNotifications);
router.put('/view/:id', notificationController.readNotification); 

module.exports = router;