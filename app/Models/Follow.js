'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Follow extends Model {
	static get visible() {
		return [ 'user_id' ];
	}
}

module.exports = Follow;
