'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReplySchema extends Schema {
	up() {
		this.create('replies', (table) => {
			table.increments();
			table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
			table.integer('comment_id').unsigned().references('id').inTable('comments').notNullable();
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
