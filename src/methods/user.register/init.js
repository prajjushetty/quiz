
class UserRegisterInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = false; // values: true/false
        this.initializer.requestMethod = ['POST']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'userName': {
                'name': 'user_name',
                'type': 'string',
                'description': 'user_name',
                'required': true,
                'default': ''
            },
            'email': {
                'name': 'email',
                'type': 'string',
                'description': 'email',
                'required': true,
                'default': ''
            },
            'password': {
                'name': 'password',
                'type': 'string',
                'description': 'password',
                'required': true,
                'default': ''
            },
            'phone': {
                'name': 'phone',
                'type': 'string',
                'description': 'phone',
                'required': true,
                'default': ''
            },
            'gender': {
                'name': 'gender',
                'type': 'string',
                'description': 'gender',
                'required': true,
                'default': ''
            }
        };

        return { ...param };
    }
}

module.exports = UserRegisterInitalize;