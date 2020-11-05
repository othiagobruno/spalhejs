/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LikeMomentSchema extends Schema {
  up() {
    this.create('like_moments', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();
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
    this.drop('like_moments');
  }
}

module.exports = LikeMomentSchema;
