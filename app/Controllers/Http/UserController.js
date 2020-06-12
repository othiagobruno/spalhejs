'use strict';

const User = use('App/Models/User');

class UserController {
	// SHOW ALL USERS
	async index() {
		const users = await User.all();
		return users;
	}

	// SHOW USER BY ID
	async show({ params, response, auth }) {
		try {
			const me = auth.current.user;
			//const followed = await me.following().ids();
			const user = await User.query()
				.where('id', params.id)
				.withCount('following')
				.withCount('followers')
				.with('followed', (builder) => {
					builder.where('followid', auth.user.id);
				})
				.withCount('posts')
				.firstOrFail();

			return user;
		} catch (err) {
			return response.status(404).json({
				status: 'error',
				message: 'user not found'
			});
		}
	}

	// CREATE USER
	async store({ request, response }) {
		const data = request.only([ 'name', 'username', 'email', 'password' ]);
		const dados = {
			...data,
			avatar:
				'https://firebasestorage.googleapis.com/v0/b/spalhe-app.appspot.com/o/usericon.png?alt=media&token=2c333530-8c82-4d6f-a1ba-dca6410c2036'
		};
		const user = await User.create(dados);
		return response.status(201).send(user);
	}

	// UPDATE USER
	async update({ request, params }) {
		const { ...data } = request.only([ 'name', 'username', 'email', 'password', 'avatar', 'private', 'biography' ]);
		const user = await User.findOrFail(params.id);
		user.merge(data);
		await user.save();
		return user;
	}
}

module.exports = UserController;
