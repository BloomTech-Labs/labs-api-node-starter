var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json([{id: 1, name: 'Ted Smith'}, {id: 2, name: 'Frank McDonald'}]);
});

module.exports = router;
