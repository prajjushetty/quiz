
class AdminUserProfileInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'userId': {
                'name': 'user_id',
                'type': 'number',
                'description': 'user_id',
                'required': true,
                'default': ''
            },
        };

        return { ...param };
    }
}

module.exports = AdminUserProfileInitalize;