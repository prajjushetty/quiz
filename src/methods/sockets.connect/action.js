const { sockets } = require('@njs2/base');
const { USER_TYPE } = require('../../global/constants');
const { updateUser, getUserList } = require('../../library/sqlLib/user.lib');

class SocketConnectAction extends baseAction {

    async executeMethod() {
        try {
            const { userObj, socketId } = this;
            await updateUser({ user_id: userObj.user_id }, { socket_id: socketId });
            sockets.emit(socketId, { 'body': `WELCOME ${userObj.user_name}` });

            const user = await getUserList({ user_type: USER_TYPE.USER });

            const socketIds = [];
            for (let i = 0; i < user.length; i++) {
                socketIds.push(user[i].socket_id);
            }
            socketIds.map(connectionId => {
                if (connectionId.length > 0 && connectionId !== socketId) {
                    sockets.emit(connectionId, { 'body': `${userObj.user_name} has joined` });
                }
            });

            this.setResponse('SUCCESS');
            return {};
        } catch (e) {
            console.log(e);
            this.setResponse('UNKNOWN_ERROR');
            return {};
        }
    };
}
module.exports = SocketConnectAction;