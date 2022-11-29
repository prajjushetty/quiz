const { sockets } = require('@njs2/base');
const { USER_TYPE, GAME_EVENT_TYPE, GAME_EVENT } = require('../../global/constants');
const { getUserList, getUserDetail } = require('../../library/sqlLib/user.lib');

class SocketsSendmessageAction extends baseAction {

	async executeMethod() {
		try {
			const { message, socketId } = this;
			const user = await getUserDetail({ socket_id: socketId });
			if (user) {
				const users = await getUserList({ user_type: USER_TYPE.USER });

				const socketIds = [];
				for (let i = 0; i < users.length; i++) {
					socketIds.push(users[i].socket_id);
				}

				socketIds.map(socketId => {
					if (socketId.length > 0) {
						sockets.emit(socketId, {
							"eventCode": GAME_EVENT_TYPE.MESSAGE_RECEIVED,
							"eventMessage": GAME_EVENT[GAME_EVENT_TYPE.MESSAGE_RECEIVED],
							"eventData": {
								"user_id": user.user_id,
								"user_name": user.user_name,
								"message": message
							}
						});
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
module.exports = SocketsSendmessageAction;