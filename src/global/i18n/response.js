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
  },
  ALREADY_REQUESTED: {
    responseCode: 1007, responseMessage: {
      "en": "already requested"
    }
  },
  ALREADY_FRIEND: {
    responseCode: 1008, responseMessage: {
      "en": "already friend"
    }
  },
  NOT_FRIEND: {
    responseCode: 1009, responseMessage: {
      "en": "not your friend"
    }
  },
  ALREADY_REJECTED: {
    responseCode: 1010, responseMessage: {
      "en": "already rejected"
    }
  },
  NO_FRIEND_REQUESTS: {
    responseCode: 1011, responseMessage: {
      "en": "no friend request"
    }
  },
  NO_FRIENDS: {
    responseCode: 1012, responseMessage: {
      "en": "no friends"
    }
  }
};

module.exports.RESPONSE = RESPONSE;
