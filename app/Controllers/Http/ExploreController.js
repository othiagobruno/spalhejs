'use strict';

const _ = require('lodash');
const File = use('App/Models/File');

class ExploreController {
	async index({ auth, response }) {
		const midias = File.query()
			.with('posts.user', (builder) => {
				builder.setVisible([ 'name', 'id', 'username', 'avatar' ]);
			})
			.orderBy('id', 'desc')
			.limit(12)
			.fetch();
		return midias;
	}
}

module.exports = ExploreController;
