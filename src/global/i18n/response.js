const RESPONSE = {
  INVALID_USER: {
    responseCode: 1001, responseMessage: {
      "en": "Invalid user data"
    }
  },
  INVALID_PASSWORD: {
    responseCode: 1002, responseMessage: {
      "en": "Incorrect password"
    }
  },
  INVALID_DATA: {
    responseCode: 1003, responseMessage:{
      "en": "paramName is invalid"
    }
  },
  EMAIL_EXISTS: {
    responseCode: 1004, responseMessage: {
      "en": "Email already exists"
    }
  },
  INVALID_USER_NAME: {
    responseCode: 1005, responseMessage:{
      "en": "Length of the name should be inbetween 3-15 characters"
    }
  },
  BLOCKED_USER: {
    responseCode: 1006, responseMessage: {
      "en": "the user is blocked"
    }
  }
};

module.exports.RESPONSE = RESPONSE;
