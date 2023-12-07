const mongoose = require('mongoose');
const tagsSchema = new mongoose.Schema({
    name: String
}, {collection: 'tags'});

module.exports = tagsSchema;