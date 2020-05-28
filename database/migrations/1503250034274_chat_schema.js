'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChatSchema extends Schema {
	up() {
		this.create('chats', (table) => {
			table.increments();
			table.integer('id_send').notNullable();
			table.integer('id_received').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('chats');
	}
}

module.exports = ChatSchema;
