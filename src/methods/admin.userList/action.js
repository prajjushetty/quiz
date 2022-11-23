const { USER_TYPE } = require('../../global/constants');
const { getUserList } = require('../../library/sqlLib/user.lib');

class AdminUserListAction extends baseAction {

    async executeMethod() {
        try {
            const users = await getUserList({ user_type: USER_TYPE.USER });
            const userList = [];
            for (let i = 0; i < users.length; i++) {
                userList[i] = {
                    user_id: users[i].user_id,
                    user_name: users[i].user_name,
                    email: users[i].email,
                    phone: users[i].phone,
                    gender: users[i].gender
                }
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
module.exports = AdminUserListAction;