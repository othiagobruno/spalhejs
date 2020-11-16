/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MessageFileSchema extends Schema {
  up() {
    this.create('message_files', (table) => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20);
      table.string('subtype', 20);
      table
        .integer('message_id')
        .unsigned()
        .references('id')
        .inTable('messages')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('message_files');
  }
}

module.exports = MessageFileSchema;
