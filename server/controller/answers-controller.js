const answerDao = require("../dao/answers-dao.js");
const questionDao = require("../dao/questions-dao.js")
const findAnswers  = async (req, res) => {
    const tags = await answerDao.findAnswers();
    res.json(tags);
}

const findAnswerById  = async (req, res) => {
    const aid = req.params.aid;
    const answer = await answerDao.findAnswerById(aid);
    res.json(answer);
}

const saveAnswer = async (req, res) => {
    let newAnswer = req.body;
    const createAnswer = await answerDao.createAnswer(newAnswer);
    res.json(createAnswer);
}

const updateAnswer = async (req, res) => {
    const answerIdToUpdate = req.params.aid;
    const answerBody = req.body;
    const status = await answerDao
        .updateAnswer(answerIdToUpdate,
            answerBody);
    res.json(status);

}

const deleteAnswer = async (req, res) => {
    const answerIdToDelete = req.params.aid;
    const status = await answerDao
        .deleteAnswer(answerIdToDelete);
    res.json(status);
}

const getAnswersByQuestionId = async (req, res) => {
    const qid = req.params.qid;
    const question = await questionDao.findQuestionById(qid);
    const answers = []
    const answersId = question.answers
    for (let aid in answersId) {
        const answer = await answerDao.findAnswerById(answersId[aid]);
        answers.push(answer);
    }

    res.json(await sortAnswers(answers));
}

const sortAnswers = async (answers) => {
    answers.sort((a, b) => {
        const keyA = new Date(a.ans_date_time),
            keyB = new Date(b.ans_date_time);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    return answers;
}

module.exports = (app) => {
    app.get('/api/answer/allAnswers', findAnswers);
    app.get('/api/answer/:aid', findAnswerById);
    app.get('/api/answer/getAnswersByQuestionId/:qid', getAnswersByQuestionId);
    app.post('/api/answer/saveAnswer', saveAnswer);
    app.put('/api/answer/updateAnswer/:aid', updateAnswer);
    app.delete('/api/answer/deleteAnswer/:aid', deleteAnswer);
};