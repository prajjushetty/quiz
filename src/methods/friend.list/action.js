const { STATUS } = require('../../global/constants');
const { getFriendList } = require('../../library/sqlLib/friend.lib');
const { getUsers } = require('../../library/sqlLib/user.lib');

class FriendListAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj } = this;
            const friendList = [];
            const userIds = [];

            const acceptedFriends = await getFriendList({ user_id: userObj.user_id, status: STATUS.ACCEPTED });
            for (let i = 0; i < acceptedFriends.length; i++) {
                userIds.push(acceptedFriends[i].other_user_id);
                friendList.push({
                    user_id: acceptedFriends[i].other_user_id
                });
            }

            const requestedFriends = await getFriendList({ other_user_id: userObj.user_id, status: STATUS.ACCEPTED });
            for (let i = 0; i < requestedFriends.length; i++) {
                userIds.push(requestedFriends[i].user_id);
                friendList.push({
                    user_id: requestedFriends[i].user_id
                });
            }

            const users = await getUsers(userIds);
            friendList.forEach(friend => {
                const user = users.find(user => user.user_id === friend.user_id);
                friend.user_name = user.user_name;
            });


            this.setResponse('SUCCESS');
            return { friend_list: friendList };
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };
}
module.exports = FriendListAction;