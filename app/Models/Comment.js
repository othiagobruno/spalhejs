'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Comment extends Model {
	posts() {
		return this.hasMany('App/Models/Post');
	}

	user() {
		return this.belongsTo('App/Models/User');
	}

	reply() {
		return this.hasMany('App/Models/Reply');
	}
}

module.exports = Comment;
