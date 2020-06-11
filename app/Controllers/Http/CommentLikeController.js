'use strict';

const CommentLike = use('App/Models/CommentLike');
const Comment = use('App/Models/Comment');
const Notification = use('App/Models/Notification');

class CommentLikeController {
	async store({ auth, params }) {
		const comment_id = params.id;
		const user_id = auth.current.user.id;
		const cm = await Comment.find(comment_id);

		const like = await CommentLike.query().where('comment_id', comment_id).where('user_id', user_id).getCount();
		if (like) {
			await CommentLike.query().where('user_id', user_id).where('comment_id', comment_id).delete();
		} else {
			const data = await CommentLike.create({ user_id, comment_id });
			if (data && cm.user_id !== user_id) {
				const data = { type: 'comment_like', post_id: cm.id, user_id, view: false, my_userid: cm.user_id };
				await Notification.create(data);
			}
		}
		return like;
	}
}

module.exports = CommentLikeController;
