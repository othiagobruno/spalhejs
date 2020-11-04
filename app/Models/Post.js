'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {

  user() {
    return this.belongsTo('App/Models/User');
  }

  share_user() {
    return this.belongsTo('App/Models/User', 'share_id', 'id');
  }

  share_post() {
    return this.hasOne(
      'App/Models/Share',
      'post_id',
      'post_id',
      'share_id',
      'user_id'
    );
  }


  likes() {
    return this.belongsToMany('App/Models/Post').pivotTable('likes');
  }

  liked() {
    return this.hasOne('App/Models/Like');
  }


  files() {
    return this.hasMany('App/Models/File');
  }

  midias_share() {
    return this.hasMany('App/Models/File', 'share_post.id', 'post_id');
  }

  comments() {
    return this.belongsToMany('App/Models/Post').pivotTable('comments');
  }

  share() {
    return this.hasMany('App/Models/Share');
  }

  static get visible() {
    return ['id', 'user_id', 'text', 'created_at', 'share_id', 'post_id'];
  }
}

module.exports = Post;
