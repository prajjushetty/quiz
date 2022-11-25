
class SocketConnectInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'socketId': {
                'name': 'socket_id',
                'type': 'string',
                'description': 'socket_id',
                'required': true,
                'default': ''
            },
        };

        return { ...param };
    }
}

module.exports = SocketConnectInitalize;