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

  likes() {
    return this.hasMany('App/Models/MomentLike');
  }

  file() {
    return this.hasOne('App/Models/MomentFile');
  }
}

module.exports = Moment;
