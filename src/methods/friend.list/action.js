const { STATUS } = require('../../global/constants');
const { getFriendList } = require('../../library/sqlLib/friend.lib');
const { getUsers } = require('../../library/sqlLib/user.lib');

class FriendListAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj } = this;
            const friendList = [];
            const userId = [];
            const acceptedFriends = await getFriendList({ user_id: userObj.user_id, status: STATUS.ACCEPTED });
            for (let i = 0; i < acceptedFriends.length; i++) {
                userId.push(acceptedFriends[i].other_user_id);
                friendList.push({
                    user_id: acceptedFriends[i].other_user_id
                });
            }

            const requestedFriends = await getFriendList({ other_user_id: userObj.user_id, status: STATUS.ACCEPTED });
            for (let i = 0; i < requestedFriends.length; i++) {
                userId.push(requestedFriends[i].user_id);
                friendList.push({
                    user_id: requestedFriends[i].user_id
                });
            }

            if (userId.length === 0) {
                this.setResponse('NO_FRIENDS');
                return {};
            } else {
                let users = [];
                const user = await getUsers(userId);

                users = friendList.filter((friendRequest) => {
                    for (let i = 0; i < user.length; i++) {
                        if (friendRequest.user_id === user[i].user_id) {
                            friendRequest.user_name = user[i].user_name;
                        }
                    }
                });
            }


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