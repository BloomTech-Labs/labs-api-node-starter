const db = require("../../data/db-config");

module.exports = { get };

function get() {
  return db("users");
}