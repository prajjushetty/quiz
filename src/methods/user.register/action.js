const { createUser, updateUser, getUserDetail } = require('../../library/sqlLib/user.lib');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { createJwtToken } = require('../../library/utilityLib/jwt.lib');
const { MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, PHONE_NUMBER_LENGTH } = require('../../global/constants');
let { SALT_ROUNDS } = process.env;
SALT_ROUNDS = Number(SALT_ROUNDS);

class UserRegisterAction extends baseAction {

    async executeMethod() {
        try {
            const { userName, email, password, phone, gender } = this;
            if (!validator.isEmail(email)) {
                this.setResponse('INVALID_DATA', {
                    paramName: 'email',
                });
                return {};
            }
            const user = await getUserDetail({ email });
            if (user) {
                this.setResponse('EMAIL_EXISTS');
                return {};
            }

            if (userName.length <= MIN_USER_NAME_LENGTH || userName.length >= MAX_USER_NAME_LENGTH) {
                this.setResponse('INVALID_USER_NAME');
                return {};
            }

            if (phone.length < PHONE_NUMBER_LENGTH) {
                this.setResponse('INVALID_DATA', {
                    paramName: 'phone',
                });
                return {};
            }

            const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const userId = await createUser({ user_name: userName, email, password: hashPassword, phone, gender });
            const accessToken = createJwtToken({ user_id: userId });
            await updateUser({ user_id: userId }, { access_token: accessToken });

            this.setResponse('SUCCESS');
            return {
                user_id: userId,
                access_token: accessToken
            };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = UserRegisterAction;