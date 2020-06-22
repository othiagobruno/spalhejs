'use strict';

const _ = require('lodash');
const Post = use('App/Models/Post');
const Database = use('Database');

class ExploreController {
	async index({ auth, response }) {
		const json = await Post.query().with('file')
			.has('file')
			.orderBy(Database.raw('RAND()'))
			.limit(50)
			.with('user', (builder) => {
				builder.setVisible(['id', 'name', 'username', 'avatar']);
			})
			.has('likes')
			.withCount('likes')
			.fetch();

		const posts = json.toJSON();
		var totalByBrand = _.orderBy(posts, '__meta__.likes_count', 'desc').slice(0, 12);

		return totalByBrand;
	}
}

module.exports = ExploreController;
