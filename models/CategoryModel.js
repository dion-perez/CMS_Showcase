const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    // One post can be a part of multiple categories
    title: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('category', CategorySchema);