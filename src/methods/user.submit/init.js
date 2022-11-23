
class UserSubmitInitalize extends baseInitialize {

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
        'description': 'question',
        'required': true,
        'default': ''
      }
    };

    return { ...param };
  }
}

module.exports = UserSubmitInitalize;