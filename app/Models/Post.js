'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
	user() {
		return this.belongsTo('App/Models/User');
	}

	likes() {
		return this.belongsToMany('App/Models/Post', 'user_id', 'postid').pivotTable('likes');
	}

	comments() {
		return this.belongsToMany('App/Models/Post', 'user_id', 'postid').pivotTable('comments');
	}

	share() {
		return this.hasMany('App/Models/Share');
	}

	static get visible() {
		return [ 'id', 'user_id', 'text', 'created_at' ];
	}
}

module.exports = Post;
