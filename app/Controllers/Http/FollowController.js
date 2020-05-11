'use strict';

const User = use('App/Models/User');

class FollowController {
	// SEGUIR UM USUÁRIO
	async follow({ params, auth, response }) {
		const user = auth.current.user;
		await user.following().attach(params.id);
		return response.json({
			status: 'success'
		});
	}

	// DEIXAR DE SEGUIR
	async unFollow({ params, auth, response }) {
		const user = auth.current.user;
		await user.following().detach(params.id);
		return response.json({
			status: 'success',
			data: null
		});
	}

	// USUARIOS QUE EU NÃO SIGO
	async usersToFollow({ auth, response }) {
		const user = auth.current.user;
		const usersAlreadyFollowing = await user.following().ids();

		const usersToFollow = await User.query()
			.whereNot('id', user.id)
			.whereNotIn('id', usersAlreadyFollowing)
			.pick(10);

		return response.json({
			status: 'success',
			data: usersToFollow
		});
	}
}

module.exports = FollowController;
