const db = require('../../data/db-config');

const findAll = async () => {
  return await db('users');
};

const findById = async (id) => {
  const user = await db('users')
    .where({ id })
    .first()
    .select('id', 'email', 'name', 'avatar');
  return user;
};

module.exports = { findAll, findById };
