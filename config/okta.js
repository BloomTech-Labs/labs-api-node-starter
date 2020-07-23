module.exports = {
  expectedAudience: 'api://default',
  config: {
    issuer: `${process.env.OKTA_URL_ISSUER}`,
    clientId: `${process.env.OKTA_CLIENT_ID}`,
    assertClaims: {
      cid: `${process.env.OKTA_CLIENT_ID}`,
    },
  },
};
