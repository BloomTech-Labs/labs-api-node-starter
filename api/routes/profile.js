const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('../models/profileModel');
const router = express.Router();

/**
 * @api {get} /users/ Request List of Profiles
 * @apiName GetProfiles
 * @apiGroup ProfileAPI
 *
 * @apiSuccess {UUID} id Unique id of the Profile.
 * @apiSuccess {String} name Name of the Profile.
 * @apiSuccess {String} email  Email of the Profile.
 * @apiSuccess {String} avatar  Avatar url for the Profile.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
 *         "name": "Frank Martinez",
 *         "email": "frank@example.com",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
 *       },
 *       {
 *         "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
 *         "name": "Cathy Warmund",
 *         "email": "cathy@example.com",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg"
 *       }
 *     ]
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:8000/profiles
 */
router.get('/', authRequired, function (req, res) {
  Profiles.findAll().then((profiles) => {
    res.status(200).json(profiles);
  });
});

module.exports = router;
