'use strict';

const _ = require('lodash');
const File = use('App/Models/File');

class ExploreController {
	async index({ auth, response }) {
		const midias = await File.query()
			.with('posts.user', (builder) => {
				builder.setVisible(['name', 'id', 'username', 'avatar']).whereNotNull('id');
			})
			.has('posts')
			.orderBy('id', 'desc')
			.limit(12)
			.fetch();


		return [];
	}
}

module.exports = ExploreController;
