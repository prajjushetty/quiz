const { USER_TYPE } = require('../../global/constants');
const { getUserList } = require('../../library/sqlLib/user.lib');

class AdminUserListAction extends baseAction {

    async executeMethod() {
        try {
            const users = await getUserList({ user_type: USER_TYPE.USER });
            const user = {};
            for (let i = 0; i < users.length; i++) {
                user[i] = {user_name : users[i].user_name,
                    email : users[i].email,
                    phone : users[i].phone,
                    gender : users[i].gender
                };
            }
            this.setResponse('SUCCESS');
            return {user};
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = AdminUserListAction;