'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Reply extends Model {
	user() {
		return this.belongsTo('App/Models/User');
	}

	comment() {
		return this.belongsTo('App/Models/Comment');
	}
}

module.exports = Reply;
