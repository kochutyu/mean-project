const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
});

module.exports = mongoose.model('categories', categorySchema);
