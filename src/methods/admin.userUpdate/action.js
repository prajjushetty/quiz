const validator = require('validator');
const bcrypt = require('bcryptjs');
const { MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, STATUS, BLOCK_USER, UNBLOCK_USER, PHONE_NUMBER_LENGTH, USER_TYPE } = require('../../global/constants');
const { getUserDetail, updateUser } = require('../../library/sqlLib/user.lib');
let { SALT_ROUNDS } = process.env;
SALT_ROUNDS = Number(SALT_ROUNDS);

class AdminUserUpdateAction extends baseAction {

    async executeMethod() {
        try {
            const { userId, userName, email, password, phone, gender, status } = this;

            const checkUser = await getUserDetail({ user_id: userId, user_type: USER_TYPE.USER });
            if (!checkUser) {
                this.setResponse('INVALID_USER');
                return {};
            }

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

            if (status) {
                if (status === BLOCK_USER) {
                    updateObj.status = STATUS.BLOCKED;
                }
                if (status === UNBLOCK_USER) {
                    updateObj.status = STATUS.ACTIVE;
                }
            }

            await updateUser({ user_id: userId },updateObj);
            const user = await getUserDetail({ user_id: userId });
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
module.exports = AdminUserUpdateAction;