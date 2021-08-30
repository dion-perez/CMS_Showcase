const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title : {
        type: String,
        required: true
    },

    // Public/private/draft etc.
    status: {
        type: String,
        default: 'public'
    },

    description: {
        type: String,
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now()
    },

    // Post can only have one user (owner)
    user: {
        // Auto get objID of user who created it
        type: Schema.Types.ObjectId,
        // Reference to the model owner
        ref: 'user'
    },

    // One post can be in multiple categories
    // one category for now, can be an array when I need it
    category: {
        type: Schema.Types.ObjectId,
        // CategoryModel
        ref: 'category'
    },

    // Array of comments made on the post
    comments: [
        {
            type: Schema.Types.ObjectId,
            // CommentModel
            ref: 'comment'
        }
    ],

    // Can people make comments on the post
    allowComments: {
        type: Boolean,
        default: false
    },

});

module.exports = mongoose.model('post', PostSchema);