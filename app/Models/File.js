'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class File extends Model {
	static get visible() {
		return [ 'name', 'url', 'type' ];
	}

	posts() {
		return this.hasOne('App/Models/Post', 'key', 'key');
	}
}

module.exports = File;
