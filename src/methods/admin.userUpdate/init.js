
class AdminUserUpdateInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['POST']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'userId': {
                'name': 'user_id',
                'type': 'number',
                'description': 'id',
                'required': true,
                'default': ''
            },
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
                'type': 'String',
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
            },
            'status': {
                'name': 'status',
                'type': 'number',
                'description': 'status',
                'required': false,
                'default': ''
            }
        };

        return { ...param };
    }
}

module.exports = AdminUserUpdateInitalize;