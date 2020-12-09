/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.string('avatar_file', '');
    });
  }
}

module.exports = UserSchema;
