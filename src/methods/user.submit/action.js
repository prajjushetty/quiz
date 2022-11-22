const { getAnswered_questionDetail, createAnswered_question, updateAnswered_question } = require('../../library/sqlLib/answered_question.lib');
const { getCustomMaster_player_levelData } = require('../../library/sqlLib/master_player_level.lib');
const { getQuestionDetail } = require('../../library/sqlLib/question.lib');
const { updateUser, getUserDetail } = require('../../library/sqlLib/user.lib');

class UserSubmitAction extends baseAction {

  async executeMethod() {
    try {
      const { userObj, questionObj } = this;
      const questions = (typeof questionObj === 'string') ? JSON.parse(questionObj) : questionObj
      const quesId = Object.keys(questions);
      const option = Object.values(questions);
      let score = 0;
      let count = 0;
      const answeredQuestionsId = [];
      const answeredUser = await getUserDetail({ user_id: userObj.user_id })
      const ExperiencePoints = answeredUser.xp
      const userLevel = await getCustomMaster_player_levelData(ExperiencePoints)
      const level = userLevel[0][0].level
      for (let i = 0; i < quesId.length; i++) {
        const answeredQuestion = await getQuestionDetail({ question_id: quesId[i] })
        answeredQuestionsId.push(quesId[i])
        if (option[i] == answeredQuestion.answer) {
          score = score + (level * 10);
          count = count + 1;
        } else {
          score = score - (level * 5);
        }
      }

      const userId = await getAnswered_questionDetail({ user_id: userObj.user_id })
      if (!userId) {
        await createAnswered_question({ user_id: userObj.user_id, question: answeredQuestionsId })
      } else {
        const questions = userId.question
        const answeredQuestions = (typeof questions === 'string') ? JSON.parse(questions) : questions
        for (let i = 0; i < answeredQuestionsId.length; i++) {
          answeredQuestions.push(answeredQuestionsId[i])
        }
        let unique_answered_question_id = [...new Set(answeredQuestions)]
        await updateAnswered_question({ user_id: userObj.user_id }, { question: unique_answered_question_id })
      }

      if (count >= 7) {
        const user = await getUserDetail({ user_id: userObj.user_id })
        const xp = user.xp
        await updateUser({ user_id: userObj.user_id }, { xp: xp + score })
      }
      this.setResponse('SUCCESS');
      return {
        user_name: answeredUser.user_name,
        email: answeredUser.email,
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