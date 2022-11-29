const { STATUS } = require('../../global/constants');
const { createFriend, getFriends, updateFriend } = require('../../library/sqlLib/friend.lib');
const { getUserDetail } = require('../../library/sqlLib/user.lib');

class FriendAddAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, otherUserId } = this;
            const user = await getUserDetail({ user_id: otherUserId });
            if (!user || otherUserId === userObj.user_id) {
                this.setResponse('INVALID_USER');
                return {};
            }
            const friend = await getFriends(userObj.user_id, otherUserId);
            if (friend) {
                if (friend.status === STATUS.PENDING) {
                    this.setResponse('ALREADY_REQUESTED');
                    return {};
                }
                else if (friend.status === STATUS.ACCEPTED) {
                    this.setResponse('ALREADY_FRIEND'); {
                        return {};
                    }
                } else {
                    await updateFriend({ user_id: friend.user_id, other_user_id: friend.other_user_id }, { status: STATUS.PENDING });
                }
            } else {
                await createFriend({ user_id: userObj.user_id, other_user_id: otherUserId });
            }
            this.setResponse('SUCCESS');
            return {};
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = FriendAddAction;