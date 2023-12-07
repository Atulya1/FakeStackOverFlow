const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String,
    text: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    asked_by: String,
    ask_date_time: Date,
    views: Number
}, {collection: 'questions'});

module.exports = questionSchema;