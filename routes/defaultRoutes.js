const express = require('express');
const router = express.Router();
// Pass all routes through defaultController
const defaultController = require('../controllers/defaultController');

router.route('/')
    .get(defaultController.index);

module.exports = router;