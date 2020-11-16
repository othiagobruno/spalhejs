/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostFileSchema extends Schema {
  up() {
    this.create('post_files', (table) => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20);
      table.string('subtype', 20);
      table
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('post_files');
  }
}

module.exports = PostFileSchema;
