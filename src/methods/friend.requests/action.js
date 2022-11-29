const { STATUS } = require('../../global/constants');
const { getFriendList } = require('../../library/sqlLib/friend.lib');
const { getUsers } = require('../../library/sqlLib/user.lib');

class FriendRequestsAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj } = this;
            const friendRequestList = [];
            const userIds = [];

            const friendRequest = await getFriendList({ user_id: userObj.user_id, status: STATUS.PENDING });
            for (let i = 0; i < friendRequest.length; i++) {
                userIds.push(friendRequest[i].other_user_id);
                friendRequestList.push({
                    friend_request_id: friendRequest[i].friend_request_id,
                    user_id: friendRequest[i].other_user_id,
                });
            }

            const friendsRequest = await getFriendList({ other_user_id: userObj.user_id, status: STATUS.PENDING });
            for (let i = 0; i < friendsRequest.length; i++) {
                userIds.push(friendsRequest[i].user_id);
                friendRequestList.push({
                    friend_request_id: friendsRequest[i].friend_request_id,
                    user_id: friendsRequest[i].user_id,
                });
            }

            if (userIds.length === 0) {
                this.setResponse('NO_FRIEND_REQUESTS');
                return {};
            } else {
                let users = [];
                const user = await getUsers(userIds);
                users = friendRequestList.filter((friendRequest) => {
                    for (let i = 0; i < user.length; i++) {
                        if (friendRequest.user_id === user[i].user_id) {
                            friendRequest.user_name = user[i].user_name;
                        }
                    }
                });
            }
            this.setResponse('SUCCESS');
            return { request_list: friendRequestList };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };

}
module.exports = FriendRequestsAction;