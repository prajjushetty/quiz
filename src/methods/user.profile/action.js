const { getUserDetail } = require('../../library/sqlLib/user.lib');

class UserProfileAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, userId } = this;

            let user;
            if (userId && userId != userObj.user_id) {
                user = await getUserDetail({ user_id: userId });
                if (!user) {
                    this.setResponse('INVALID_USER');
                    return {};
                }
            } else {
                user = userObj;
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
module.exports = UserProfileAction;