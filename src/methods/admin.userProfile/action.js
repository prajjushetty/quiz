const { USER_TYPE } = require('../../global/constants');
const { getUserDetail } = require('../../library/sqlLib/user.lib');

class AdminUserProfileAction extends baseAction {

    async executeMethod() {
        try {
            const { userId } = this;
            const user = await getUserDetail({ user_id: userId, user_type: USER_TYPE.USER });
            if (!user) {
                this.setResponse('INVALID_USER');
                return {};
            }
            this.setResponse('SUCCESS');
            return {
                user_name: user.user_name,
                email: user.email,
                phone: user.phone,
                gender: user.gender
            };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = AdminUserProfileAction;