let constant = [];


constant.MIN_USER_NAME_LENGTH = 3;
constant.MAX_USER_NAME_LENGTH = 15;
constant.PHONE_NUMBER_LENGTH = 10;

constant.BLOCK_USER = 1;
constant.UNBLOCK_USER = 2;

constant.USER_TYPE = {
  ADMIN: 1,
  USER: 2
}

constant.QUESTION_LEVEL = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3
};

constant.LEADERBOARD_LIMIT = 10;
constant.COUNT_OF_QUESTIONS_TO_WIN = 7;
constant.POINT_FOR_CORRECT_ANSWER = 10;
constant.POINT_FOR_WRONG_ANSWER = 5;

constant.STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  BLOCKED: 3,
  DELETED: 4,
  IN_PROGRESS: 5,
  PENDING: 6,
  REJECTED: 7,
  CLOSED: 8,
  ACCEPTED: 9,
  KICKED: 10,
  FORCE_QUIT: 11,
  COMPLETED: 12,
  FORCE_CLOSE: 13
};

constant.EMAIL_VERIFICATION_MAX_TIME_SECONDS = 10 * 60;

constant.CONNECTION_HANDLER_METHOD = 'sockets/connect';
constant.DISCONNECTION_HANDLER_METHOD = 'sockets/disconnect';

module.exports = constant;