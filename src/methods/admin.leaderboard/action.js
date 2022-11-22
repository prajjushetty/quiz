const { USER_TYPE, STATUS } = require("../../global/constants");
const { getCustomUserData } = require("../../library/sqlLib/user.lib");

class AdminLeaderboardAction extends baseAction {

  async executeMethod() {
    try {
      const users = await getCustomUserData(USER_TYPE.USER, STATUS.ACTIVE)
      const user = {};
      for (let i = 0; i < users[0].length; i++) {
        user[i] = {
          user_name: users[0][i].user_name,
          email: users[0][i].email,
          phone: users[0][i].phone,
          gender: users[0][i].gender,
          xp: users[0][i].xp
        };
      }
      this.setResponse('SUCCESS');
      return { user };
    } catch (e) {
      console.log(e);
      this.setResponse('UNKNOWN_ERROR');
      return {};
    }
  };

}
module.exports = AdminLeaderboardAction;