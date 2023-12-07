const answerDao = require("../dao/answers-dao.js");

class UnansweredSorter {
    async sort(questions) {
        return questions.filter(question => question.answers.length === 0);
    }
}

class ActiveSorter {
    constructor(answerDao) {
        this.answerDao = answerDao;
    }

    async sort(questions) {
        await Promise.all(
            questions.map(async (question) => {
                const mostRecentAnswerDates = await Promise.all(
                    question.answers.map(async (ansId) => {
                        const answer = await this.answerDao.findAnswerById(ansId);
                        return answer ? new Date(answer.ans_date_time) : 0;
                    })
                );
                const mostRecentAnswerDate = Math.max(...mostRecentAnswerDates);
                question.mostRecentAnswerDate = mostRecentAnswerDate;
            })
        );

        questions.sort((a, b) => b.mostRecentAnswerDate - a.mostRecentAnswerDate);
        return questions;
    }
}

class NewestSorter {
    async sort(questions) {
        questions.sort((a, b) => {
            const keyA = new Date(a.ask_date_time),
                keyB = new Date(b.ask_date_time);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
        return questions;
    }
}

class QuestionSortFactory {
    constructor(answerDao) {
        this.answerDao = answerDao;
    }

    createSorter(sortType) {
        switch (sortType) {
            case 'unanswered':
                return new UnansweredSorter();
            case 'active':
                return new ActiveSorter(this.answerDao);
            case 'newest':
                return new NewestSorter();
            default:
                throw new Error('Invalid sortType');
        }
    }
}
const q = new QuestionSortFactory(answerDao);
module.exports = q;
