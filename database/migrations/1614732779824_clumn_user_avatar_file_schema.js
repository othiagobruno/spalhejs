/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClumnUserAvatarFileSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.string('avatar_file');
    });
  }

  down() {
    this.table('clumn_user_avatar_files', () => {
      // reverse alternations
    });
  }
}

module.exports = ClumnUserAvatarFileSchema;
