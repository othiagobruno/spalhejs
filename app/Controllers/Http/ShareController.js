'use strict';

const Post = use('App/Models/Post');
const Share = use('App/Models/Share');

class ShareController {
	async show({ params, auth }) {
		const post = await Post.find(params.id);
		const share = await Share.query().where('post_id', post.id).with('user').fetch();
		// await share.load('user');
		// await share.load('post');
		return share;
	}

	async store({ request, auth, params, response }) {
		const user = auth.current.user;
		const post = await Post.find(params.id);
		await Share.create({
			user_id: user.id,
			post_id: post.id
		});
		//const text = post.text;
		//await user.posts().create({ text });
		return response.json({
			status: 'success',
			message: 'Shared'
		});
	}
}

module.exports = ShareController;
