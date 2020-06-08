'use strict';

const CommentLike = use('App/Models/CommentLike');

class CommentLikeController {
	async store({ auth, params }) {
		const comment_id = params.id;
		const user_id = auth.current.user.id;

		const like = await CommentLike.query().where('comment_id', comment_id).where('user_id', user_id).getCount();
		if (like) {
			await CommentLike.query().where('user_id', user_id).where('comment_id', comment_id).delete();
		} else {
			await CommentLike.create({ user_id, comment_id });
		}
		return like;
	}
}

module.exports = CommentLikeController;
