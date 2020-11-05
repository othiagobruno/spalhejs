/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
      table.string('text', 500);
      table.integer('share_id');
      table.integer('post_id');
      table.string('key').notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }
}

module.exports = PostSchema;
