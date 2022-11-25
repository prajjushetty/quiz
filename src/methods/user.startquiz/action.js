const { QUESTION_LEVEL } = require('../../global/constants');
const { getAnsweredQuestionDetail } = require('../../library/sqlLib/answeredQuestion.lib');
const { getQuestions } = require('../../library/sqlLib/question.lib');

class UserStartquizAction extends baseAction {

    async executeMethod() {
        try {
            const questions = [];
            const { userObj } = this;
            const answeredUserId = await getAnsweredQuestionDetail({ user_id: userObj.user_id });
            if (answeredUserId) {
                const questionsId = answeredUserId.question;

                const easyQuestions = await getQuestions(QUESTION_LEVEL.EASY, 4, questionsId);
                const easyQuestionsId = [];
                for (let i = 0; i < easyQuestions.length; i++) {
                    easyQuestionsId.push(easyQuestions[i].question_id);
                }

                const easy = [];
                if (easyQuestions.length < 4) {
                    const easyQuestion = await getQuestions(QUESTION_LEVEL.EASY, (4 - easyQuestions.length), easyQuestionsId);
                    easy.push(...easyQuestions, ...easyQuestion);
                } else {
                    easy.push(...easyQuestions);
                }

                const mediumQuestions = await getQuestions(QUESTION_LEVEL.MEDIUM, 3, questionsId);
                const mediumQuestionsId = [];
                for (let i = 0; i < mediumQuestions.length; i++) {
                    mediumQuestionsId.push(mediumQuestions[i].question_id);
                }

                const medium = [];
                if (mediumQuestions.length < 3) {
                    const mediumQuestion = await getQuestions(QUESTION_LEVEL.MEDIUM, (3 - mediumQuestions.length), mediumQuestionsId);
                    medium.push(...mediumQuestions, ...mediumQuestion);
                } else {
                    medium.push(...mediumQuestions);
                }

                const hardQuestions = await getQuestions(QUESTION_LEVEL.HARD, 3, questionsId);
                const hardQuestionsId = [];
                for (let i = 0; i < hardQuestions.length; i++) {
                    hardQuestionsId.push(hardQuestions[i].question_id);
                }

                const hard = [];
                if (hardQuestions.length < 3) {
                    const hardQuestion = await getQuestions(QUESTION_LEVEL.HARD, (3 - hardQuestions.length), hardQuestionsId);
                    hard.push(...hardQuestions, ...hardQuestion);
                } else {
                    hard.push(...hardQuestions);
                }

                questions.push(...easy, ...medium, ...hard);
            } else {
                const easyQuestion = await getQuestions(QUESTION_LEVEL.EASY, 4);
                const mediumQuestion = await getQuestions(QUESTION_LEVEL.MEDIUM, 3);
                const hardQuestion = await getQuestions(QUESTION_LEVEL.HARD, 3);
                questions.push(...easyQuestion, ...mediumQuestion, ...hardQuestion);
            }

            const questionList = [];
            for (let i = 0; i < questions.length; i++) {
                questionList[i] = {
                    question_id: questions[i].question_id,
                    question: questions[i].question,
                    question_level: questions[i].question_level,
                    option_1: questions[i].option_1,
                    option_2: questions[i].option_2,
                    option_3: questions[i].option_3,
                    option_4: questions[i].option_4,
                    answer: questions[i].answer
                };
            }
            this.setResponse('SUCCESS');
            return { question_list: questionList };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = UserStartquizAction;