/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MomentFileSchema extends Schema {
  up() {
    this.create('moment_files', (table) => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20);
      table.string('subtype', 20);
      table
        .integer('moment_id')
        .unsigned()
        .references('id')
        .inTable('moments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('moment_files');
  }
}

module.exports = MomentFileSchema;
