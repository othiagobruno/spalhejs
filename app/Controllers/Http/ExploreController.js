'use strict';

const Post = use('App/Models/Post');

class ExploreController {
	async index({ auth, response }) {
		const posts = Post.query().fetch();

		return posts;
	}
}

module.exports = ExploreController;
