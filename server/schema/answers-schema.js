const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    text: String,
    ans_by: String,
    ans_date_time: Date
}, {collection: 'answers'});

module.exports = answerSchema;