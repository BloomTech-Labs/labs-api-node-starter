import express from 'express';
const router = express.Router();

/**
 * @api {get} / Root path, ping
 * @apiName GetRoot
 * @apiGroup PingAPI
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "api": "up"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/
 */
router.get('/', function (req, res) {
  res.status(200).json({ api: 'up' });
});

export default router;
