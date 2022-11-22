const { updateUser, getUserDetail } = require('../../library/sqlLib/user.lib');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, PHONE_NUMBER_LENGTH } = require('../../global/constants');
let { SALT_ROUNDS } = process.env;
SALT_ROUNDS = Number(SALT_ROUNDS);

class UserUpdateAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, userName, email, password, phone, gender } = this;

            const updateObj = {};
            if (userName) {
                if (userName.length <= MIN_USER_NAME_LENGTH || userName.length >= MAX_USER_NAME_LENGTH) {
                    this.setResponse('INVALID_USER_NAME');
                    return {};
                }
                updateObj.user_name = userName;
            }

            if (email) {
                if (!validator.isEmail(email)) {
                    this.setResponse('INVALID_DATA', {
                        paramName: 'email',
                    });
                    return {};
                }
                updateObj.email = email;
            }

            if (password) {
                const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
                updateObj.password = hashPassword;
            }

            if (phone) {
                if (phone.length < PHONE_NUMBER_LENGTH) {
                    this.setResponse('INVALID_DATA', {
                        paramName: 'phone',
                    });
                    return {};
                }
                updateObj.phone = phone;
            }

            if (gender) {
                updateObj.gender = gender;
            }
            await updateUser({ user_id: userObj.user_id }, updateObj);
            const user = await getUserDetail({ user_id: userObj.user_id });
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
module.exports = UserUpdateAction;