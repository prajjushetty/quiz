const { QUESTION_LEVEL } = require('../../global/constants');
const { getAnswered_questionDetail } = require('../../library/sqlLib/answered_question.lib');
const { getCustomQuestionData, getCustomQuestionDatas } = require('../../library/sqlLib/question.lib');

class UserStartquizAction extends baseAction {

    async executeMethod() {
        try {
            const questions = [];
            const { userObj } = this;
            const userId = await getAnswered_questionDetail({ user_id: userObj.user_id });
            if (userId) {
                const questionsId = userId.question;

                const questionEasy = await getCustomQuestionDatas(QUESTION_LEVEL.EASY, questionsId, 4);
                let easyQuestionId = []
                for (let i = 0; i < questionEasy[0].length; i++) {
                    easyQuestionId.push(questionEasy[0][i].question_id)
                }
                let easy = []
                if (questionEasy[0].length < 4) {
                    const easyQuestion = await getCustomQuestionDatas(QUESTION_LEVEL.EASY, easyQuestionId, (4 - questionEasy[0].length))
                    easy.push(...questionEasy[0], ...easyQuestion[0])
                } else {
                    easy.push(...questionEasy[0])
                }

                const questionMedium = await getCustomQuestionDatas(QUESTION_LEVEL.MEDIUM, questionsId, 3);
                let mediumQuestionId = []
                for (let i = 0; i < questionMedium[0].length; i++) {
                    mediumQuestionId.push(questionMedium[0][i].question_id)
                }
                let medium = []
                if (questionMedium[0].length < 3) {
                    const mediumQuestion = await getCustomQuestionDatas(QUESTION_LEVEL.MEDIUM, mediumQuestionId, (3 - questionMedium[0].length))
                    medium.push(...questionMedium[0], ...mediumQuestion[0])
                } else {
                    medium.push(...questionMedium[0])
                }

                const questionHard = await getCustomQuestionDatas(QUESTION_LEVEL.HARD, questionsId, 3);
                let hardQuestionId = []
                for (let i = 0; i < questionHard[0].length; i++) {
                    hardQuestionId.push(questionHard[0][i].question_id)
                }
                let hard = []
                if (questionHard[0].length < 3) {
                    const hardQuestion = await getCustomQuestionDatas(QUESTION_LEVEL.HARD, hardQuestionId, (3 - questionHard[0].length))
                    hard.push(...questionHard[0], ...hardQuestion[0])
                } else {
                    hard.push(...questionHard[0])
                }

                questions.push(...easy, ...medium, ...hard);
            } else {
                const easyQuestion = await getCustomQuestionData(QUESTION_LEVEL.EASY, 4);
                const mediumQuestion = await getCustomQuestionData(QUESTION_LEVEL.MEDIUM, 3);
                const hardQuestion = await getCustomQuestionData(QUESTION_LEVEL.HARD, 3);
                questions.push(...easyQuestion[0], ...mediumQuestion[0], ...hardQuestion[0]);
            }
            let questionArray= []
            for( let i=0; i<questions.length; i++){
                questionArray[i]={
                    question: questions[i].question,
                    question_level: questions[i].question_level,
                    option_1: questions[i].option_1,
                    option_2: questions[i].option_2,
                    option_3: questions[i].option_3,
                    option_4: questions[i].option_4,
                    answer: questions[i].answer
                }
            }
            this.setResponse('SUCCESS');
            return { questionArray };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = UserStartquizAction;