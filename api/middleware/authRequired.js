const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaVerifierConfig = require('../../config/okta');
const Profiles = require('../profile/profileModel');
const oktaJwtVerifier = new OktaJwtVerifier(oktaVerifierConfig.config);

const lookupProfile = async (id) => {
  return await Profiles.findById(id).then((profile) => {
    return profile;
  });
};
const makeProfileObj = (claims) => {
  return {
    id: claims.sub,
    email: claims.email,
    name: claims.name,
  };
};
const findCreateProfile = async (jwt) => {
  const foundProfile = await lookupProfile(jwt.claims.sub);
  if (foundProfile) {
    return foundProfile;
  } else {
    const newProfileObj = makeProfileObj(jwt.claims);
    return await Profiles.create(newProfileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};
/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) throw new Error('Missing idToken');

    const idToken = match[1];
    oktaJwtVerifier
      .verifyAccessToken(idToken, oktaVerifierConfig.expectedAudience)
      .then(async (data) => {
        const profile = await findCreateProfile(data);
        if (profile) {
          res.locals.profile = profile;
        } else {
          throw new Error('Unable to process idToken');
        }
        next();
      });
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
