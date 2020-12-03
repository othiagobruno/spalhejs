/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FollowSchema extends Schema {
  up() {
    this.create('follows', (table) => {
      table.increments();
      table.boolean('status').defaultTo(true);
      table
        .integer('followid')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
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
    this.drop('follows');
  }
}

module.exports = FollowSchema;
