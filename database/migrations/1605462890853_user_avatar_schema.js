/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserAvatarSchema extends Schema {
  up() {
    this.create('user_avatars', (table) => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20);
      table.string('subtype', 20);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_avatars');
  }
}

module.exports = UserAvatarSchema;
