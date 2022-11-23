class answered_question {
    async getAnsweredQuestionDetail(whereClause) {
        return await SQLManager.findOne('answered_question', whereClause);
    }

    async getAnsweredQuestionList(whereClause) {
        return await SQLManager.find('answered_question', whereClause);
    }

    async updateAnsweredQuestion(whereClause, updateData) {
        return await SQLManager.update('answered_question', whereClause, updateData);
    }

    async createAnsweredQuestion(answered_questionObj) {
        return await SQLManager.insert('answered_question', answered_questionObj);
    }

    async getCustomAnsweredQuestionData(gender) {
        return await SQLManager.doExecuteRawQuery('SELECT * FROM answered_question WHERE gender = :gender', { gender: gender });
    }
}

module.exports = new answered_question;