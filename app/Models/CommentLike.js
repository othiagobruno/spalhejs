'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class CommentLike extends Model {
	comment() {
		return this.belongsToMany('App/Models/Comment').pivotTable('likes');
	}
}

module.exports = CommentLike;
