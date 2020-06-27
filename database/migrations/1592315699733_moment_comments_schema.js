'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MomentCommentsSchema extends Schema {
  up() {
    this.create('moment_comments', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('moment_id')
        .unsigned()
        .references('id')
        .inTable('moments')
        .notNullable()
        .onDelete('CASCADE');
      table.string('text').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('moment_comments');
  }
}

module.exports = MomentCommentsSchema;
