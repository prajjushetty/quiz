class answered_question {
    async getAnswered_questionDetail(whereClause) {
        return await SQLManager.findOne('answered_question', whereClause);
    }

    async getAnswered_questionList(whereClause) {
        return await SQLManager.find('answered_question', whereClause);
    }

    async updateAnswered_question(whereClause, updateData) {
        return await SQLManager.update('answered_question', whereClause, updateData);
    }

    async createAnswered_question(answered_questionObj) {
        return await SQLManager.insert('answered_question', answered_questionObj);
    }

    async getCustomAnswered_questionData(gender) {
        return await SQLManager.doExecuteRawQuery('SELECT * FROM answered_question WHERE gender = :gender', { gender: gender });
    }
}

module.exports = new answered_question;