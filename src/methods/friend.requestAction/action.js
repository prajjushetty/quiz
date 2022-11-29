const { STATUS, ACCEPT_FRIEND_REQUEST, REJECT_FRIEND_REQUEST } = require('../../global/constants');
const { getFriendDetail, updateFriend } = require('../../library/sqlLib/friend.lib');

class FriendRequestActionAction extends baseAction {

    async executeMethod() {
        try {
            const { friendRequestId, otherUserId, action } = this;
            const friendRequest = await getFriendDetail({ friend_request_id: friendRequestId, other_user_id: otherUserId });
            if (!friendRequest) {
                this.setResponse('INVALID_DATA', {
                    paramName: 'Friend request id',
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
                    if (action === ACCEPT_FRIEND_REQUEST) {
                        await updateFriend({ friend_request_id: friendRequestId }, { status: STATUS.ACCEPTED });
                    }
                    if (action === REJECT_FRIEND_REQUEST) {
                        await updateFriend({ friend_request_id: friendRequestId }, { status: STATUS.REJECTED });
                    }
                } else {
                    this.setResponse('INVALID_DATA', {
                        paramName: 'Friend request id',
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