'use strict';

const User = use('App/Models/User');

class GtokenController {
	async create({ auth, request }) {
		const user = auth.current.user;
		const { token } = request.only([ 'token' ]);
		const u = await User.query().where('id', user.id).update({ token });
		return u;
	}
}

module.exports = GtokenController;
