'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class NotificationsSchema extends Schema {
	up() {
		this.create('notifications', (table) => {
			table.increments();
			table.string('my_userid');
			table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
			table.string('type');
			table.string('post_id');
			table.string('view');
			table.timestamps();
		});
	}

	down() {
		this.drop('notifications');
	}
}

module.exports = NotificationsSchema;
