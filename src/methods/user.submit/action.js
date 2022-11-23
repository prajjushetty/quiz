const { getAnsweredQuestionDetail, createAnsweredQuestion, updateAnsweredQuestion } = require('../../library/sqlLib/answeredQuestion.lib');
const { getCustomMasterPlayerLevelData } = require('../../library/sqlLib/masterPlayerLevel.lib');
const { getQuestionDetail } = require('../../library/sqlLib/question.lib');
const { updateUser } = require('../../library/sqlLib/user.lib');

class UserSubmitAction extends baseAction {

  async executeMethod() {
    try {
      const { userObj, question } = this;

      const questions = (typeof question === 'string') ? JSON.parse(question) : question
      const questionId = Object.keys(questions);
      const option = Object.values(questions);
      let score = 0;
      let count = 0;
      const answeredQuestionsIds = [];

      const ExperiencePoints = userObj.xp
      const userLevel = await getCustomMasterPlayerLevelData(ExperiencePoints)
      const level = userLevel.level
      for (let i = 0; i < questionId.length; i++) {
        const answeredQuestion = await getQuestionDetail({ question_id: questionId[i] })
        answeredQuestionsIds.push(questionId[i])
        if (option[i] == answeredQuestion.answer) {
          score = score + (level * 10);
          count = count + 1;
        } else {
          score = score - (level * 5);
        }
      }

      const answeredUserId = await getAnsweredQuestionDetail({ user_id: userObj.user_id })
      if (!answeredUserId) {
        await createAnsweredQuestion({ user_id: userObj.user_id, question: answeredQuestionsIds })
      } else {
        const questions = answeredUserId.question
        const answeredQuestions = (typeof questions === 'string') ? JSON.parse(questions) : questions
        for (let i = 0; i < answeredQuestionsIds.length; i++) {
          answeredQuestions.push(answeredQuestionsIds[i])
        }
        let uniqueAnsweredQuestionId = [...new Set(answeredQuestions)]
        await updateAnsweredQuestion({ user_id: userObj.user_id }, { question: uniqueAnsweredQuestionId })
      }

      if (count >= 7) {
        await updateUser({
          user_id: userObj.user_id
          },
          {
            xp: {'$inc': score}
          }
        )
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
      return {}
    }
  };

}
module.exports = UserSubmitAction;