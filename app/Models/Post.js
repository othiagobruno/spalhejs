'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
	// get user
	user() {
		return this.belongsTo('App/Models/User');
	}

	// get all likes count
	likes() {
		return this.belongsToMany('App/Models/Post').pivotTable('likes');
	}

	// get user liked post
	liked() {
		return this.hasOne('App/Models/Like');
	}

	midias() {
		return this.hasMany('App/Models/File', 'key', 'key');
	}

	// get all comments in post
	comments() {
		return this.belongsToMany('App/Models/Post').pivotTable('comments');
	}

	// get all shares post
	share() {
		return this.hasMany('App/Models/Share');
	}

	static get visible() {
		return [ 'id', 'user_id', 'text', 'created_at' ];
	}
}

module.exports = Post;
