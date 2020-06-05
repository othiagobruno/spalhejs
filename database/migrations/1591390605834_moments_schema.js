'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MomentsSchema extends Schema {
	up() {
		this.create('moments', (table) => {
			table.increments();
			table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
			table.string('midia');
			table.string('text');
			table.string('type');
			table.timestamps();
		});
	}

	down() {
		this.drop('moments');
	}
}

module.exports = MomentsSchema;
