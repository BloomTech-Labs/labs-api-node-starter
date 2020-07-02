exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table
        .uuid('id')
        .notNullable()
        .unique()
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('email');
      table.string('name');
      table.string('avatar');
      table.timestamps();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profiles');
};
