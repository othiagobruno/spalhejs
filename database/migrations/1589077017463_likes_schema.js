'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LikesSchema extends Schema {
	up() {
		this.create('likes', (table) => {
			table.increments();
			table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
			table.integer('postid').unsigned().references('id').inTable('posts').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('likes');
	}
}

module.exports = LikesSchema;
