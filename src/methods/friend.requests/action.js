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

            const users = await getUsers(userIds);
      
            friendRequestList.forEach((friendRequest) => {
                const user = users.find(user => user.user_id === friendRequest.user_id);
                friendRequest.user_name = user.user_name;
            });

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