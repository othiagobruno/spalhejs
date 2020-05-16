'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Like extends Model {
	static get visible() {
		return [ 'user_id' ];
	}
}

module.exports = Like;
