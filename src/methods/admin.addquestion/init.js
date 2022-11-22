
class AdminAddquestionInitalize extends baseInitialize {

    constructor() {
        super();
        this.initializer = {};
        this.initializer.isSecured = true; // values: true/false
        this.initializer.requestMethod = ['POST']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
    }

    getParameter() {
        const param = {
            'question': {
                'name': 'question',
                'type': 'string',
                'description': 'question',
                'required': true,
                'default': ''
            },
            'option1': {
                'name': 'option_1',
                'type': 'string',
                'description': 'option_1',
                'required': true,
                'default': ''
            },
            'option2': {
                'name': 'option_2',
                'type': 'string',
                'description': 'option_2',
                'required': true,
                'default': ''
            },
            'option3': {
                'name': 'option_3',
                'type': 'string',
                'description': 'option_3',
                'required': true,
                'default': ''
            },
            'option4': {
                'name': 'option_4',
                'type': 'string',
                'description': 'option_4',
                'required': true,
                'default': ''
            },
            'questionLevel': {
                'name': 'question_level',
                'type': 'number',
                'description': 'question_level',
                'required': true,
                'default': ''
            },
            'answer': {
                'name': 'answer',
                'type': 'number',
                'description': 'answer',
                'required': true,
                'default': ''
            }
        };
        return { ...param };
    }
}

module.exports = AdminAddquestionInitalize;