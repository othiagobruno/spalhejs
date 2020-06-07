'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MviewsSchema extends Schema {
	up() {
		this.create('mviews', (table) => {
			table.increments();
			table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('CASCADE');
			table.integer('moment_id').unsigned().references('id').inTable('moments').notNullable().onDelete('CASCADE');
			table.timestamps();
		});
	}

	down() {
		this.drop('mviews');
	}
}

module.exports = MviewsSchema;
