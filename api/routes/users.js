var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({id: 1, name: 'Ted Smith'});
});

module.exports = router;
