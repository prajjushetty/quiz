const { getUserDetail, updateUser } = require('../../library/sqlLib/user.lib');
const bcrypt = require('bcryptjs');
const { createJwtToken } = require('../../library/utilityLib/jwt.lib');
const { STATUS, USER_TYPE } = require('../../global/constants');

class UserLoginAction extends baseAction {

    async executeMethod() {
        try {
            const { email, password } = this;
            const user = await getUserDetail({ email, user_type: USER_TYPE.USER });

            if (!user) {
                this.setResponse('INVALID_USER');
                return {};
            }
            if (user.status === STATUS.BLOCKED) {
                this.setResponse('BLOCKED_USER');
                return {};
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                this.setResponse('INVALID_PASSWORD');
                return {};
            }
            const accessToken = createJwtToken({ user_id: user.user_id });
            await updateUser({ user_id: user.user_id }, { access_token: accessToken });

            this.setResponse('SUCCESS');
            return {
                user_id: user.user_id,
                access_token: accessToken
            };

        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = UserLoginAction;