// jest setupTestFrameworkScriptFile doesn't process this file before transpiling

// module.exports = require('../api/config');

var dotenv = require('dotenv');
const config_result = dotenv.config();
console.log('config_result', config_result);
if (config_result.error) {
  throw config_result.error;
}
require("core-js/stable");
require("regenerator-runtime/runtime");

module.exports = dotenv;
