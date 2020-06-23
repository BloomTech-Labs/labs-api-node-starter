var express = require('express');
var Users = require('../models/userModel');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    });
});

module.exports = router;
