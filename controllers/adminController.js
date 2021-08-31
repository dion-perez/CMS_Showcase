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

    createPosts: (req, res) => {
        res.render('admin/posts/create');
    },

    submitPosts: (req, res, next) => {
        // Ternary;
        // if post has allow comments, set it to true, otherwise to false
        const commentsAllowed = req.body.allowComments ? true : false;

        const newPost = new post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed
        })

        newPost.save().then(post => {
                console.log(post);
                req.flash('success-message', 'Post created successfully');
                res.redirect('/admin/posts');
            });
    },

    editPostGetRoute: (req, res) => {
        // Find the post, send an id param whilst accessing this endpoint
        const id = req.params.id;
        // .then() because it's a promise
        post.findById(id)
            .then(post => {
                // Render and send this post as an object to the view
                res.render('admin/posts/edit', {post: post});
            })
            .catch(err => {
                console.log(`Error ${err}`);
            });

    },

    editPostUpdateRoute: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;
        const id = req.params.id;
        // const label = req.body.status;
        // const description = req.body.description;
        // const title = req.body.title;
        //
        // console.log(`ID is: ${id} - title is ${title} - desc is ${description} - status is ${label}`);

        post.findById(id)
            .then(post => {
                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = commentsAllowed;
                post.description = req.body.description;

                post.save().then(updatedPost => {
                    req.flash('success-message', `The post ${updatedPost.title} has been updated`);
                    res.redirect('/admin/posts');
                });
            });
    },

    deletePost: (req, res) => {
        console.log('Delete hit');
        post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} been deleted`);
                res.redirect('/admin/posts');
            })
            .catch(err => {
                console.log(`Error ${err}`);
            });
    },

};