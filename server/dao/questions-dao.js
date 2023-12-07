const questionsModel = require("../models/questions-model.js");
const findQuestions = () => questionsModel.find();
const findQuestionById = (qid) => questionsModel.findById({_id: qid});
const createQuestion = (question) => questionsModel.create(question);
const deleteQuestion = (qid) => questionsModel.deleteOne({_id: qid});
const updateQuestion = (qid, question) => questionsModel.updateOne({_id: qid}, {$set: question})
const newestQuestions = () => questionsModel.find({}).sort({ ask_date_time: -1 }).exec();
const unansweredQuestions = () => questionsModel.find({ answers: [] }).exec();
const findQuestionByTagId = (tid) => questionsModel.find({ "tags": tid });
const findQuestionBySearchParams = (searchParam) => questionsModel.find({
    $or: [
        {
            text: {
                $regex: searchParam,
                $options: 'i'
            }
        },
        {
            title: {
                $regex: searchParam,
                $options: 'i'
            }
        }
    ]
})

module.exports = {
    findQuestions,
    findQuestionById,
    createQuestion,
    deleteQuestion,
    updateQuestion,
    newestQuestions,
    unansweredQuestions,
    findQuestionByTagId,
    findQuestionBySearchParams
};