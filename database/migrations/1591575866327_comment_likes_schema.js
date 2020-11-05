/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentLikesSchema extends Schema {
  up() {
    this.create('comment_likes', (table) => {
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
      table.timestamps();
    });
  }

  down() {
    this.drop('comment_likes');
  }
}

module.exports = CommentLikesSchema;
