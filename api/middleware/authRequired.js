const createError = require('http-errors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const expectedAudience = 'api://default';

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `${process.env.OKTA_URL_ISSUER}`,
  clientId: `${process.env.OKTA_CLIENT_ID}`,
  assertClaims: {
    aud: expectedAudience,
  },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match)
      throw new Error('You must be authenticated to access this resource');

    const accessToken = match[1];
    oktaJwtVerifier
      .verifyAccessToken(accessToken, expectedAudience)
      .then((data) => {
        // console.log('oktaJwtVerifier', data);
        next();
      })
      .catch((err) => {
        console.error('oktaJwtVerifier', err);
        next(createError(500, 'Unable to authorize'));
      });
  } catch (err) {
    next(createError(401, err.message));
  }
};

module.exports = authRequired;
