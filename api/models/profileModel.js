import db from '../../data/db-config';

const findAll = async () => {
  return await db('profiles');
};

const findById = async (id) => {
  const user = await db('profiles')
    .where({ id })
    .first()
    .select('id', 'email', 'name', 'avatar');
  return user;
};

export { findAll, findById };
