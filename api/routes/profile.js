const express = require('express');
const authRequired = require('../middleware/authRequired');
const Profiles = require('../models/profileModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - name
 *        - avatarUrl
 *      properties:
 *        id:
 *          type: string
 *          description: okta ID token
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of profile avatar
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *
 * /profiles:
 *  get:
 *    description: Returns a list of profiles
 *    summary: Get a list of all profiles
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    responses:
 *      200:
 *        description: array of profiles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Profile'
 *              example:
 *                - id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                - id: '013e4ab94d96542e791f'
 *                  email: 'cathy@example.com'
 *                  name: 'Cathy Warmund'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, function (req, res) {
  Profiles.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    profileId:
 *      name: id
 *      in: path
 *      description: ID of the profile to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /profile/{id}:
 *  get:
 *    description: Find profiles by ID
 *    summary: Returns a single profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
