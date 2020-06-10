'use strict';

const Post = use('App/Models/Post');
const Share = use('App/Models/Share');

class ShareController {
	async show({ params }) {
		const post = await Post.find(params.id);
		const share = await Share.query().where('post_id', post.id).with('user').fetch();
		return share;
	}

	async store({ auth, params, response }) {
		const user = auth.current.user;
		const post = await Post.find(params.id);

		await Share.create({
			user_id: user.id,
			post_id: post.id
		});

		const data = await user.posts().create({
			share_id: post.user_id,
			post_id: post.id,
			key: new Date().getTime()
		});

		if (data) {
			const data = { type: 'share', post_id: post.id, user_id: user.id, view: false, my_userid: post.user_id };
			await Notification.create(data);
		}

		return response.json({
			status: 'success',
			message: data
		});
	}
}

module.exports = ShareController;
