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

        // Ternary;
        // if post has allow comments, set it to true, otherwise to false
        const commentsAllowed = req.body.allowComments ? true: false;

        const newPost = new post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed
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

    editPost: (req, res) => {
        // Find the post, send an id param whilst accessing this endpoint
        const id = req.params.id;

        // .then() because it's a promise
        post.findById(id).then(post => {
            // Render and send this post as an object to the view
            res.render('admin/posts/edit', {post: post});
        });
    },

}