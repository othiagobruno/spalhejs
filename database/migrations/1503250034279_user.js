/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('username', 80).notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.string('biography', 150);
      table.boolean('private').defaultTo(false);
      table.string('website', 40);
      table.string('token', 250);
      table.boolean('status').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
