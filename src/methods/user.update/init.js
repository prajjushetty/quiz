
class UserUpdateInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['POST']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'userName': {
                'name': 'user_name',
                'type': 'string',
                'description': 'name',
                'required': false,
                'default': ''
            },
            'email': {
                'name': 'email',
                'type': 'string',
                'description': 'email',
                'required': false,
                'default': ''
            },
            'password': {
                'name': 'password',
                'type': 'string',
                'description': 'password',
                'required': false,
                'default': ''
            },
            'phone': {
                'name': 'phone',
                'type': 'string',
                'description': 'phone',
                'required': false,
                'default': ''
            },
            'gender': {
                'name': 'gender',
                'type': 'string',
                'description': 'gender',
                'required': false,
                'default': ''
            }

        };

        return { ...param };
    }
}

module.exports = UserUpdateInitalize;