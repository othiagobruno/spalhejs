/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MomentsSchema extends Schema {
  up() {
    this.create('moments', (table) => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20);
      table.string('subtype', 20);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('moments');
  }
}

module.exports = MomentsSchema;
