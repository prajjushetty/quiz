const { sockets } = require('@njs2/base');
const { STATUS, GAME_EVENT_TYPE, GAME_EVENT } = require('../../global/constants');
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
          sockets.emit(user.socket_id, {
            'eventCode': GAME_EVENT_TYPE.FRIEND_REQUEST,
            'eventMessage': GAME_EVENT[GAME_EVENT_TYPE.FRIEND_REQUEST],
            'eventData': {
              'friend_request_id': friend.friend_request_id,
              'user_id': userObj.user_id,
              'user_name': userObj.user_name,
            }
          });
        }
      } else {
        const requestedFriend = await createFriend({ user_id: userObj.user_id, other_user_id: otherUserId });
        sockets.emit(user.socket_id, {
          'eventCode': GAME_EVENT_TYPE.FRIEND_REQUEST,
          'eventMessage': GAME_EVENT[GAME_EVENT_TYPE.FRIEND_REQUEST],
          'eventData': {
            'friend_request_id': requestedFriend,
            'user_id': userObj.user_id,
            'user_name': userObj.user_name,
          }
        });

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