const express = require('express');
const router = express.Router();
// Pass all routes through adminController
const adminController = require('../controllers/adminController');

// Applies to every route (*) that starts with /admin
// this route is used whenever admin route is hit to load layout
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

// Admin controller with index method
// Default route
router.route('/')
    .get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);

router.route('/posts/create')
    .get(adminController.createPosts)
    .post(adminController.submitPosts);

router.route('/posts/edit/:id')
    .get(adminController.editPostGetRoute)
    .post(adminController.editPostUpdateRoute);

router.route('/posts/delete/:id')
    .post(adminController.deletePost);
    // .delete doesn't work, post must be used instead and is overridden by method-override in app.js
    //.delete(adminController.deletePost);

module.exports = router;