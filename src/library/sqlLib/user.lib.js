class user {   
    async getUserDetail(whereClause) {
        return await SQLManager.findOne('user', whereClause);
    }
  
    async getUserList(whereClause) {
        return await SQLManager.find('user', whereClause);
    }
  
    async updateUser(whereClause, updateData) {
        return await SQLManager.update('user', whereClause, updateData);
    }
  
    async createUser(userObj) {
        return await SQLManager.insert('user', userObj);
    }
  
    async getCustomUserData(user_type, status) {
        return await SQLManager.doExecuteRawQuery(`SELECT * FROM user where user_type=${user_type} and status=${status} ORDER BY xp DESC limit 10`);
    }
}
  
module.exports = new user;