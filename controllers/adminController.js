const post = require ('../models/PostModel');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    
    // Mongoose .find() method, return everything in Post collection
    // Can also use find().lean() instead of runtimeOptions in app.js app.engine setup
    // to fix "it is not an own property" error.
    getPosts: (req, res) => {
        post.find().then(posts => {
            // Grab all posts when page is rendered
            res.render('admin/posts/index', {posts: posts});
        });
    },

    submitPosts: (req, res) => {
        const newPost = new post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });

        newPost.save().then(post => {
            console.log(post);
            req.flash('success-message', 'Post created successfully');
            res.redirect('/admin/posts');
        });
    },

    createPosts: (req, res) => {
        res.render('admin/posts/create');
    },
}