const { COUNT_OF_QUESTIONS_TO_WIN, POINT_FOR_CORRECT_ANSWER, POINT_FOR_WRONG_ANSWER } = require('../../global/constants');
const { getAnsweredQuestionDetail, createAnsweredQuestion, updateAnsweredQuestion } = require('../../library/sqlLib/answeredQuestion.lib');
const { getPlayerLevel } = require('../../library/sqlLib/masterPlayerLevel.lib');
const { getQuestionDetail } = require('../../library/sqlLib/question.lib');
const { updateUser } = require('../../library/sqlLib/user.lib');

class UserSubmitAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, question } = this;

            const questions = (typeof question === 'string') ? JSON.parse(question) : question;
            const questionId = Object.keys(questions);
            const option = Object.values(questions);
            let score = 0;
            let count = 0;
            const answeredQuestionsIds = [];

            const experiencePoints = userObj.xp;
            const userLevel = await getPlayerLevel(experiencePoints);
            const level = userLevel.level;
            for (let i = 0; i < questionId.length; i++) {
                const answeredQuestion = await getQuestionDetail({ question_id: questionId[i] });
                answeredQuestionsIds.push(questionId[i]);
                if (option[i] == answeredQuestion.answer) {
                    score = score + (level * POINT_FOR_CORRECT_ANSWER);
                    count = count + 1;
                } else {
                    score = score - (level * POINT_FOR_WRONG_ANSWER);
                }
            }

            const answeredUserId = await getAnsweredQuestionDetail({ user_id: userObj.user_id });
            if (!answeredUserId) {
                await createAnsweredQuestion({ user_id: userObj.user_id, question: answeredQuestionsIds });
            } else {
                const questions = answeredUserId.question;
                const answeredQuestions = (typeof questions === 'string') ? JSON.parse(questions) : questions;
                for (let i = 0; i < answeredQuestionsIds.length; i++) {
                    answeredQuestions.push(answeredQuestionsIds[i]);
                }
                const uniqueAnsweredQuestionId = [...new Set(answeredQuestions)];
                await updateAnsweredQuestion({ user_id: userObj.user_id }, { question: uniqueAnsweredQuestionId });
            }

            if (count >= COUNT_OF_QUESTIONS_TO_WIN) {
                await updateUser({
                    user_id: userObj.user_id
                },
                {
                    xp: { '$inc': score }
                }
                );
            }
            this.setResponse('SUCCESS');
            return {
                user_name: userObj.user_name,
                email: userObj.email,
                score
            };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = UserSubmitAction;