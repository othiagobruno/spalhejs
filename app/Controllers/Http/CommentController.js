'use strict';

const Comment = use('App/Models/Comment');
const Post = use('App/Models/Post');
const Notification = use('App/Models/Notification');

class CommentController {
	async index({ auth, responde }) {
		//
	}

	async show({ auth, params, response }) {
		const user = auth.current.user;
		try {
			const post = await Comment.query()
				.where('post_id', params.id)
				.with('user')
				.withCount('reply')
				.with('liked', (builder) => {
					builder.where('user_id', user.id);
				})
				.withCount('likes')
				.fetch();
			return post;
		} catch (error) {}
		return response.send({ error: 'cant find post comments' });
	}

	async store({ auth, request, response }) {
		const user = auth.current.user;
		const dataReq = request.only([ 'post_id', 'text' ]);
		const data = { ...dataReq, user_id: user.id };
		const comment = await Comment.create(data);
		const post = await Post.find(dataReq.post_id);

		if (comment && post.user_id !== user.id) {
			const data = {
				type: 'comment',
				post_id: post.id,
				user_id: user.id,
				view: false,
				my_userid: post.user_id
			};
			await Notification.create(data);
		}

		return comment;
	}

	async destroy({ auth, params }) {
		const cm = await Comment.query().where('id', params.id).where('user_id', auth.current.user.id).first();
		if (!cm) {
			return response.status(404).send('não encontramos esse comentário');
		}
		await cm.delete();
	}
}

module.exports = CommentController;
