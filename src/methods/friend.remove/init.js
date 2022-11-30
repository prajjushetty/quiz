
class FriendRemoveInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['POST']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
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