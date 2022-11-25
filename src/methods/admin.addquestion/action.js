const { QUESTION_LEVEL } = require('../../global/constants');
const { createQuestion } = require('../../library/sqlLib/question.lib');

class AdminAddquestionAction extends baseAction {

    async executeMethod() {
        try {
            const { question, option1, option2, option3, option4, questionLevel, answer } = this;

            if (questionLevel !== QUESTION_LEVEL.EASY && questionLevel !== QUESTION_LEVEL.MEDIUM && questionLevel !== QUESTION_LEVEL.HARD) {
                this.setResponse('INVALID_DATA', {
                    paramName: 'question level',
                });
                return {};
            }

            if (answer !== 1 && answer !== 2 && answer !== 3 && answer !== 4) {
                this.setResponse('INVALID_DATA', {
                    paramName: 'answer',
                });
                return {};
            }

            const questionId = await createQuestion({
                question: question,
                option_1: option1,
                option_2: option2,
                option_3: option3,
                option_4: option4,
                question_level: questionLevel,
                answer
            });
            this.setResponse('SUCCESS');
            return { question_id: questionId };
        } catch (e) {
            console.log(e.message);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = AdminAddquestionAction;