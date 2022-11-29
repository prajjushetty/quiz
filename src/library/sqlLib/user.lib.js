const SQLManager = require('@njs2/sql');
const { USER_TYPE, STATUS, LEADERBOARD_LIMIT } = require('../../global/constants');

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

  async getLeaderboard() {
    const result = await SQLManager.doExecuteRawQuery(`
        SELECT * 
        FROM user 
        WHERE user_type=${USER_TYPE.USER} 
        and status=${STATUS.ACTIVE} 
        ORDER BY xp DESC limit ${LEADERBOARD_LIMIT}
         `);
    return result[0];
  }

  async getUsers(userIds = []) {
    if (userIds.length) {
      const result = await SQLManager.doExecuteRawQuery(`
        SELECT * 
        FROM user
        WHERE user_id IN (${userIds.toString()})
        `);
      return result[0];
    }else{
      return [];
    }

  }
}

module.exports = new user;