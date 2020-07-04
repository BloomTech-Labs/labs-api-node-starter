import express from 'express';
import authRequired from '../middleware/authRequired';
import * as Profiles from '../models/profileModel';
const router = express.Router();

/**
 * @api {get} /profile/ Request List of Profiles
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

/**
 * @api {get} /profile/:id Request User information
 * @apiName GetProfile
 * @apiGroup ProfileAPI
 *
 * @apiParam {UUID} id Profile's unique ID.
 * @apiPermission Authorized users only
 *
 * @apiSuccess {UUID} id Unique id of the Profile.
 * @apiSuccess {String} name Name of the Profile.
 * @apiSuccess {String} email  Email of the Profile.
 * @apiSuccess {String} avatar Avatar url for the Profile.
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
 * @apiError ProfileNotFound 404 The id of the Profile was not found.
 * @apiError InvalidAuthentication 403 Authentication failed.
 *
 * @apiErrorExample ProfileNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProfileNotFound"
 *     }
 * @apiErrorExample Forbidden:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Authorization failed"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3000/Profile/013e4ab9-77e0-48de-9efe-4d96542e791f
 */
router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Profiles.findById(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'ProfileNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export default router;
