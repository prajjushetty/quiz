const { sockets } = require('@njs2/base');
const { USER_TYPE } = require('../../global/constants');
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
                        sockets.emit(socketId, { 'name': user.user_name, 'user_id': user.user_id, 'message': message });
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