'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Follow extends Model {
	static get visible() {
		return [ 'user_id', 'followid' ];
	}

	user() {
		return this.belongsTo('App/Models/User');
	}

	user_followers() {
		return this.belongsTo('App/Models/User', 'followid', 'id');
	}
}

module.exports = Follow;
