var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: root path returning status
 *  produces:
 *    - applicaiton/json
 *  responses:
 *    200:
 *      description: status is up
 *      content:
 *        application/xml:
 *          schema:
 *            type: object
 *            required:
 *              - api
 *            properties:
 *              api:
 *                type: boolean
 *                example: true
 */
router.get('/', function (req, res) {
  res.status(200).json({ api: 'up' });
});

module.exports = router;
