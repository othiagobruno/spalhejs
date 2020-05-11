'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FollowSchema extends Schema {
	up() {
		this.create('follows', (table) => {
			table.increments();
			table.integer('followid').unsigned().references('id').inTable('users').notNullable();
			table.integer('userid').unsigned().references('id').inTable('users').notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop('follows');
	}
}

module.exports = FollowSchema;
