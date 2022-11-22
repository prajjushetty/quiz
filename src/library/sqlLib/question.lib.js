class question {   
    async getQuestionDetail(whereClause) {
        return await SQLManager.findOne('question', whereClause);
    }
  
    async getQuestionList(whereClause) {
        return await SQLManager.find('question', whereClause);
    }
  
    async updateQuestion(whereClause, updateData) {
        return await SQLManager.update('question', whereClause, updateData);
    }
  
    async createQuestion(questionObj) {
        return await SQLManager.insert('question', questionObj);
    }
  
    async getCustomQuestionData(question_level, limit) {
        return await SQLManager.doExecuteRawQuery(`SELECT * FROM question WHERE question_level = ${question_level} order by rand() limit ${limit}`);
    }

    async getCustomQuestionDatas(question_level, questions, limit) {
        return await SQLManager.doExecuteRawQuery(`SELECT * FROM question WHERE question_level = ${question_level} and question_id not in (${questions.toString()}) order by rand() limit ${limit}`);

    }
}
  
module.exports = new question;