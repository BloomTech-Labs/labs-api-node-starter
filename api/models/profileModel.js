const db = require('../../data/db-config');

const findAll = async () => {
  return await db('profiles');
};

const findBy = (filter) => {
  return db('profiles').where(filter);
};

const findById = async (id) => {
  const user = await db('profiles')
    .where({ id })
    .first()
    .select('id', 'email', 'name', 'avatar');
  return user;
};

const create = async (profile) => {
  console.log(profile);
  return db('profiles').insert(profile).returning('*');
};

module.exports = { findAll, findBy, findById, create };
