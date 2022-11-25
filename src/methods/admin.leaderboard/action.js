const { getLeaderboard } = require('../../library/sqlLib/user.lib');

class AdminLeaderboardAction extends baseAction {

    async executeMethod() {
        try {
            const users = await getLeaderboard();
            const userList = [];
            for (let i = 0; i < users.length; i++) {
                userList[i] = {
                    user_id: users[i].user_id,
                    user_name: users[i].user_name,
                    email: users[i].email,
                    phone: users[i].phone,
                    gender: users[i].gender,
                    xp: users[i].xp
                };
            }
            this.setResponse('SUCCESS');
            return { user_list: userList };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };
}
module.exports = AdminLeaderboardAction;