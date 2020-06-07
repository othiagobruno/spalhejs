'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Share extends Model {
	user() {
		return this.belongsTo('App/Models/User');
	}

	users() {
		return this.belongsTo('App/Models/User', 'share_id', 'id');
	}

	post() {
		return this.belongsTo('App/Models/Post', 'share_id', 'user_id');
	}
}

module.exports = Share;
