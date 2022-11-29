const { STATUS } = require('../../global/constants');
const { updateFriend, getFriends } = require('../../library/sqlLib/friend.lib');

class FriendRemoveAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, friendRequestId, otherUserId } = this;
            const friend = await getFriends(userObj.user_id, otherUserId);
            if (!friend) {
                this.setResponse('NOT_FRIEND');
                return {};
            }
            else {
                if (friend.status === STATUS.ACCEPTED) {
                    await updateFriend({ friend_request_id: friendRequestId }, { status: STATUS.REMOVED });
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