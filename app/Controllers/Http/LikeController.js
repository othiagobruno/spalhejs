'use strict';

const Like = use('App/Models/Like');
class LikeController {
	async likePost({ auth, response }) {
		try {
			const user = auth.current.user;
			const post_id = request.only([ 'post_id ' ]);
			const like = await Like.findOrCreate({ user_id: user.id, post_id }, { user_id: user.id, post_id });
			return response.json({
				status: 'success',
				data: like
			});
		} catch (err) {
			return response.json({
				status: 'error',
				data: 'error like the post'
			});
		}
	}

	async deslikePost({ params, auth, response }) {
		const user = auth.current.user;
		await Like.query().where('user_id', user.id).where('post_id', params.id).delete();
		return response.json({
			status: 'success',
			data: 'deleted success'
		});
	}
}

module.exports = LikeController;
