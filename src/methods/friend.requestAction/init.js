
class FriendRequestActionInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['POST']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'friendRequestId': {
                'name': 'friend_request_id',
                'type': 'number',
                'description': 'friend request id',
                'required': true,
                'default': ''
            },
            'action': {
                'name': 'action',
                'type': 'number',
                'description': 'action', //ACCEPT_FRIEND_REQUEST=1, REJECT_FRIEND_REQUEST=2
                'required': true,
                'default': ''
            }
        };

        return { ...param };
    }
}

module.exports = FriendRequestActionInitalize;