'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentsSchema extends Schema {
	up() {
		this.create('comments', (table) => {
			table.increments();
			table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('CASCADE');
			table.integer('post_id').unsigned().references('id').inTable('posts').notNullable().onDelete('CASCADE');
			table.string('text', 240).notNullable();
			table.string('image', 240);
			table.timestamps();
		});
	}

	down() {
		this.drop('comments');
	}
}

module.exports = CommentsSchema;
