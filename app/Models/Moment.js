'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Moment extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  views() {
    return this.hasOne(
      'App/Models/Mview',
      'id',
      'moment_id',
      'user_id',
      'user_id'
    );
  }

  comments() {
    return this.hasMany('App/Models/MomentComment');
  }
}

module.exports = Moment;
