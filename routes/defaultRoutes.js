const express = require('express');
const router = express.Router();
// Pass all routes through defaultController
const defaultController = require('../controllers/defaultController');

// HTML layout for all subroutes
// for now, lets user get back from their profile to the main page
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default';

    next();
})

router.route('/')
    .get(defaultController.index);

router.route('/login')
    .get(defaultController.loginGet)
    .post(defaultController.loginPost);

router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost);

module.exports = router;