'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MessagesSchema extends Schema {
	up() {
		this.create('messages', (table) => {
			table.increments();
			table.string('id_send').notNullable();
			table.string('id_received').notNullable();
			table.integer('id_msg').unsigned().references('id').inTable('chats').notNullable().onDelete('CASCADE');
			table.string('text');
			table.string('audio');
			table.string('midia');
			table.string('view');
			table.timestamps();
		});
	}

	down() {
		this.drop('messages');
	}
}

module.exports = MessagesSchema;
