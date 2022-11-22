const AutoLoad = require('@njs2/base/base/autoload.class');
AutoLoad.loadConfig();

const config = JSON.parse(process.env.SQL);

const sqlConfig = {};

sqlConfig.host = config.SQL_DB_HOST;
sqlConfig.database = config.SQL_DB_NAME;
sqlConfig.port = config.SQL_DB_PORT;
sqlConfig.user = config.SQL_DB_USER;
sqlConfig.password = config.SQL_DB_PASSWORD;

module.exports = sqlConfig;
