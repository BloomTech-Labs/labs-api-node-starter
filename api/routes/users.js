var express = require('express');
var Users = require('../models/userModel');
var router = express.Router();

/**
 * @api {get} /users/ Request List of Users
 * @apiName GetUsers
 * @apiGroup UserAPI
 *
 * @apiSuccess {UUID} id Unique id of the User.
 * @apiSuccess {String} name Name of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} avatar  Avatar url for the User.
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
 *     curl -i http://localhost:8000/users
 */
router.get('/', function (req, res) {
  Users.findAll().then((users) => {
    res.status(200).json(users);
  });
});

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup UserAPI
 *
 * @apiParam {UUID} id Users unique ID.
 * @apiPermission Authorized users only
 *
 * @apiSuccess {UUID} id Unique id of the User.
 * @apiSuccess {String} name Name of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} avatar Avatar url for the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
 *       "name": "Frank Martinez",
 *       "email": "frank@example.com",
 *       "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
 *     }
 *
 * @apiError UserNotFound 404 The id of the User was not found.
 * @apiError InvalidAuthentication 403 Authentication failed.
 *
 * @apiErrorExample UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 * @apiErrorExample Forbidden:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Authorization failed"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/user/013e4ab9-77e0-48de-9efe-4d96542e791f
 */
router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Users.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'UserNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
