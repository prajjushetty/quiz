const { STATUS, FRIEND_REQUEST_ACTION } = require('../../global/constants');
const { getFriendDetail, updateFriend } = require('../../library/sqlLib/friend.lib');

class FriendRequestActionAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, friendRequestId, action } = this;
            const friendRequest = await getFriendDetail({ friend_request_id: friendRequestId, other_user_id: userObj.user_id });
            if (!friendRequest) {
                this.setResponse('INVALID_DATA', {
                    paramName: 'friend_request_id',
                });
                return {};
            }
            else {
                if (friendRequest.status === STATUS.REJECTED) {
                    this.setResponse('ALREADY_REJECTED');
                    return {};
                } else if (friendRequest.status === STATUS.ACCEPTED) {
                    this.setResponse('ALREADY_FRIEND');
                    return {};
                } else if (friendRequest.status === STATUS.PENDING) {
                    if (action === FRIEND_REQUEST_ACTION.ACCEPT) {
                        await updateFriend({ friend_request_id: friendRequestId }, { status: STATUS.ACCEPTED });
                    }
                    if (action === FRIEND_REQUEST_ACTION.REJECT) {
                        await updateFriend({ friend_request_id: friendRequestId }, { status: STATUS.REJECTED });
                    }
                } else {
                    this.setResponse('INVALID_DATA', {
                        paramName: 'friend_request_id',
                    });
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
module.exports = FriendRequestActionAction;