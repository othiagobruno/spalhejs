'use strict';

const User = use('App/Models/User');

class SearchController {
	async index({ auth, request, response, params }) {
		const users = await User.query()
			.where('username', 'LIKE', '%' + params.id + '%')
			.orWhere('name', 'LIKE', '%' + params.id + '%')
			.fetch();
		return users;
	}
}

module.exports = SearchController;
