/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReplySchema extends Schema {
  up() {
    this.create('replies', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('comment_id')
        .unsigned()
        .references('id')
        .inTable('comments')
        .notNullable()
        .onDelete('CASCADE');
      table.string('text', 250);
      table.string('image', 240);
      table.timestamps();
    });
  }

  down() {
    this.drop('replies');
  }
}

module.exports = ReplySchema;
