'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LikesSchema extends Schema {
	up() {
		this.create('likes', (table) => {
			table.increments();
			table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('CASCADE');
			table.integer('post_id').unsigned().references('id').inTable('posts').notNullable().onDelete('CASCADE');
			table.timestamps();
		});
	}

	down() {
		this.drop('likes');
	}
}

module.exports = LikesSchema;
