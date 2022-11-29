
class FriendRemoveInitalize extends baseInitialize {

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
            'otherUserId': {
                'name': 'other_user_id',
                'type': 'number',
                'description': 'other user id',
                'required': false,
                'default': ''
            },
        };

        return { ...param };
    }
}

module.exports = FriendRemoveInitalize;