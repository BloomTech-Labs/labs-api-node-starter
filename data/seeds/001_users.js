const seedUsers = [
  {
    id: "d376de05-5f1b-4086-93b1-77681ca93614",
    name: "Bob Smith",
    email: "bob@example.com",
  },
  {
    id: "013e4ab9-77e0-48de-9efe-4d96542e791f",
    name: "Cathy Warmund",
    email: "cathy@example.com",
  }
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert(seedUsers);
    });
};