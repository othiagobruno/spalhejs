'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MomentFilesSchema extends Schema {
  up() {
    this.create('moment_files', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('key').notNullable();
      table.string('url').notNullable();
      table.string('type').notNullable();
      table
        .integer('moment_id')
        .unsigned()
        .references('id')
        .inTable('moments')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('moment_files');
  }
}

module.exports = MomentFilesSchema;
