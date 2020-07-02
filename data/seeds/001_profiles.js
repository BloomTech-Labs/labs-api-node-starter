const faker = require('faker');

const profiles = [...new Array(20)].map(() => ({
  id: faker.random.uuid(),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
