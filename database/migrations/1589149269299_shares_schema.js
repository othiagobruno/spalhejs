/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SharesSchema extends Schema {
  up() {
    this.create('shares', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .notNullable()
        .onDelete('CASCADE');
      table.string('text', 250);
      table.timestamps();
    });
  }

  down() {
    this.drop('shares');
  }
}

module.exports = SharesSchema;
