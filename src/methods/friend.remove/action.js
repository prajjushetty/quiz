const { STATUS } = require('../../global/constants');
const { updateFriend, getFriends } = require('../../library/sqlLib/friend.lib');

class FriendRemoveAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, otherUserId } = this;
            const friend = await getFriends(userObj.user_id, otherUserId);
            if (!friend) {
                this.setResponse('NOT_FRIEND');
                return {};
            }
            else {
                if (friend.user_id === otherUserId && friend.status === STATUS.ACCEPTED) {
                    await updateFriend({ user_id: friend.user_id, other_user_id: userObj.user_id }, { status: STATUS.REMOVED });
                } else if (friend.user_id === userObj.user_id && friend.status === STATUS.ACCEPTED) {
                    await updateFriend({ user_id: userObj.user_id, other_user_id: otherUserId }, { status: STATUS.REMOVED });
                } else {
                    this.setResponse('NOT_FRIEND');
                    return {};
                }
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
module.exports = FriendRemoveAction;