
class UserSubmitInitalize extends baseInitialize {

  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = true; // values: true/false
    this.initializer.requestMethod = ['GET']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      'questionObj': {
        'name': 'question_obj',
        'description': 'question_object',
        'required': true,
        'default': ''
      }
    };

    return { ...param };
  }
}

module.exports = UserSubmitInitalize;