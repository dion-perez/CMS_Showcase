const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body : {
        type: String,
        required: true
    },

    // Who created the comment
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    date: {
        type: Date,
        default: Date.now()
    },

    commentApproved: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('comment', CommentSchema);