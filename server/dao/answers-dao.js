const answersModel = require("../models/answers-model.js");
const findAnswers = () => answersModel.find();
const findAnswerById = (aid) => answersModel.findById({_id: aid});
const createAnswer = (answer) => answersModel.create(answer);
const deleteAnswer = (aid) => answersModel.deleteOne({_id: aid});
const updateAnswer = (aid, answer) => answersModel.updateOne({_id: aid}, {$set: answer})

module.exports = {
    findAnswers,
    findAnswerById,
    createAnswer,
    deleteAnswer,
    updateAnswer
};