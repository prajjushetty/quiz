const { sockets } = require('@njs2/base');
const { USER_TYPE } = require('../../global/constants');
const { updateUser, getUserList, getUserDetail } = require('../../library/sqlLib/user.lib');

class SocketDisconnectAction extends baseAction {

    async executeMethod() {
        try {
            const { socketId } = this;
            const user = await getUserDetail({ socket_id: socketId });
            if (user) {
                const users = await getUserList({ user_type: USER_TYPE.USER });
                const connectionIds = [];
                for (let i = 0; i < users.length; i++) {
                    connectionIds.push(users[i].socket_id);
                }

                connectionIds.map(connectionId => {
                    if (connectionId.length > 0 && connectionId !== socketId) {
                        sockets.emit(connectionId, { 'body': `${user.user_name} has left` });
                    }
                });

                await updateUser({ socket_id: socketId }, { socket_id: '' });
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
module.exports = SocketDisconnectAction;