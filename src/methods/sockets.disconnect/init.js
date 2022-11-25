
class SocketDisconnectInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = false; // values: true/false
        this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'socketId': {
                'name': 'socket_id',
                'type': 'string',
                'description': 'socket_id',
                'required': false,
                'default': ''
            },
        };

        return { ...param };
    }
}

module.exports = SocketDisconnectInitalize;