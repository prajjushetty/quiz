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

    async getQuestions(question_level, limit, questions = []) {
        let appendQuery = '';
        if (questions.length) {
            appendQuery = ` and question_id not in (${questions.toString()}) `;
        }
        const result = await SQLManager.doExecuteRawQuery(`
        SELECT *
        FROM question 
        WHERE question_level = ${question_level}
        ${appendQuery}
        ORDER by rand() limit ${limit}
      `);
        return result[0];
    }

}

module.exports = new question;