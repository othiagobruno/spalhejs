'use strict';

class GtokenController {
	async create({ auth, request }) {
		const { token } = request.only([ 'token' ]);
		const user = await auth.current.user.user().update({ token });
		return user;
	}
}

module.exports = GtokenController;
