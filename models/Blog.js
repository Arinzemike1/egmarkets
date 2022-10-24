const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    body: {
        type: String
    },
});

module.exports = mongoose.model('Blog', BlogSchema);