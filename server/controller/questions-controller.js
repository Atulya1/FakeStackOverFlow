const questionDao = require("../dao/questions-dao.js");
const tagDao = require("../dao/tags-dao.js")
const sortService = require("../service/question-sort-service");

const findQuestions  = async (req, res) => {
    const sortType = req.params.sortType;
    const questions = await questionDao.findQuestions();
    const sortClass = await sortService.createSorter(sortType);
    const sortedQuestions = await sortClass.sort(questions);
    res.json(sortedQuestions);
}

const findQuestionById  = async (req, res) => {
    const qid = req.params.qid;
    const question = await questionDao.findQuestionById(qid);
    res.json(question);
}

const saveQuestion = async (req, res) => {
    let newQuestion = req.body;
    let tagParams = newQuestion.tags;
    const tagIds = []
    for(const t in tagParams) {
        const id = await tagDao.tagCreate(tagParams[t]);
        if(id !== '') {
            tagIds.push(id._id);
        }
    }
    newQuestion.tags = tagIds;
    const questionId = await questionDao.createQuestion(newQuestion);
    res.json(questionId);
}

const updateQuestion = async (req, res) => {
    const questionIdToUpdate = req.params.qid;
    const questionBody = req.body;
    const status = await questionDao
        .updateQuestion(questionIdToUpdate,
            questionBody);
    res.json(status);
}

const updateQuestionView = async (req, res) => {
    const questionIdToUpdate = req.params.qid;
    const question = await questionDao.findQuestionById(questionIdToUpdate);
    if(!question.views) {
        question.views = 1;
    } else {
        question.views += 1;
    }
    const status = await questionDao
        .updateQuestion(questionIdToUpdate,
            question);
    res.json(status);
}

const addAnswerIdToQuestion = async (req, res) => {
    const questionId = req.params.qid;
    const question = await questionDao.findQuestionById(questionId);

    const answerId = req.body.answerId;
    question.answers.push(answerId);
    const status = await questionDao
        .updateQuestion(questionId,
            question);
    res.json(status);
}

const deleteQuestion = async (req, res) => {
    const questionIdToDelete = req.params.qid;
    const status = await questionDao
        .deleteQuestion(questionIdToDelete);
    res.json(status);
}

module.exports = (app) => {
    app.get('/api/question/allQuestions/:sortType', findQuestions);
    app.get('/api/question/:qid', findQuestionById);
    app.post('/api/question/addAnswerId/:qid', addAnswerIdToQuestion);
    app.post('/api/question/saveQuestion', saveQuestion);
    app.put('/api/question/updateQuestion/:qid', updateQuestion);
    app.put('/api/question/updateQuestionView/:qid', updateQuestionView);
    app.delete('/api/question/deleteQuestion/:qid', deleteQuestion);
};