const axios = require('axios');
const dsConfig = require('../../config/dsConfig');
const dsClient = axios.create(dsConfig);

const getPrediction = (label, x1, x2) => {
  return dsClient.post('/predict', { x1, x2, x3: label });
};

module.exports = { getPrediction };
