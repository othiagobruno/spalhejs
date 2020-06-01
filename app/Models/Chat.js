'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Chat extends Model {
	messages() {
		return this.belongsTo('App/Models/Message', 'id_msg', 'id');
	}

	user() {
		return this.hasOne('App/Models/User', 'id_received', 'id');
	}
}

module.exports = Chat;
