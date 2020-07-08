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
 *     curl -i -H "Authorization: Bearer <jwt-access-token>" http://localhost:8000/profiles
 */
router.get('/', authRequired, function (req, res) {
  Profiles.findAll().then((profiles) => {
    res.status(200).json(profiles);
  });
});

/**
 * @api {get} /profile/:id Request Profile information
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
 *     curl -i -H "Authorization: Bearer <jwt-access-token>" http://localhost:3000/Profile/013e4ab9-77e0-48de-9efe-4d96542e791f
 */
router.get('/:id', authRequired, function (req, res) {
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

// curl -i -X POST -H "Content-Type: application/json" -d '{"id":"00uhjfrwdWAQvD8JV4x6","email":"frank@example.com","name":"Frank Smith","avatarUrl":"https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"}' http://localhost:8005/Profile/create
router.post('/', authRequired, (req, res) => {
  const profile = req.body;
  console.log('profile', profile);
  if (profile) {
    const id = profile.id || 0;
    Profiles.findBy({ id })
      .first()
      .then((pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          Profiles.create(profile)
            .then((profile) =>
              res
                .status(200)
                .json({ message: 'profile created', profile: profile[0] })
            )
            .catch((err) => {
              console.error(err);
              res.status(500).json({ message: err.message });
            });
        } else {
          res.status(400).json({ message: 'profile already exists' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({ message: 'Profile missing' });
  }
});

router.put('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Profiles.findById(id)
    .then(
      Profiles.update(id, data)
        .then((updated) => {
          res.status(200).json(updated[0]);
        })
        .catch((err) => {
          res.status(500).json({
            message: `Could not update profile '${id}'`,
            error: err.message,
          });
        })
    )
    .catch((err) => {
      res.status(404).json({
        message: `Could not find profile '${id}'`,
        error: err.message,
      });
    });
});

router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  Profiles.remove(id)
    .then(() => {
      res.status(200).json({ message: `Profile '${id}' was deleted.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Could not delete profile with ID: ${id}`,
        error: err.message,
      });
    });
});

module.exports = router;
