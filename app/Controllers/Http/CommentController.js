'use strict';

const Comment = use('App/Models/Comment');

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
		return comment;
	}

	async destroy({ auth, params }) {}
}

module.exports = CommentController;
