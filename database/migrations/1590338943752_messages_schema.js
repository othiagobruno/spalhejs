/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MessagesSchema extends Schema {
  up() {
    this.create('messages', (table) => {
      table.increments();
      table.integer('id_send').notNullable();
      table.integer('id_received').notNullable();
      table
        .integer('chat_id')
        .unsigned()
        .references('id')
        .inTable('chats')
        .notNullable()
        .onDelete('CASCADE');
      table.string('text');
      table.integer('view');
      table.timestamps();
    });
  }

  down() {
    this.drop('messages');
  }
}

module.exports = MessagesSchema;
