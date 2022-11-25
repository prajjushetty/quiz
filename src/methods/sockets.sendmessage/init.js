
class SocketsSendmessageInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'message': {
                'name': 'message',
                'type': 'string',
                'description': 'message',
                'required': false,
                'default': ''
            },
            'socketId': {
                'name': 'socket_id',
                'type': 'string',
                'description': 'socket_id',
                'required': true,
                'default':''
            }
        };

        return { ...param };
    }
}

module.exports = SocketsSendmessageInitalize;