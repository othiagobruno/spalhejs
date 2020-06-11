'use strict';

const Mview = use('App/Models/Mview');

class MviewController {
	async show({ auth, params }) {
		const id = params.id;
		const mview = await Mview.query().where('moment_id', id).with('user').fetch();
		return mview;
	}

	async store({ params, auth }) {
		const id = params.id;
		const data = await Mview.findOrCreate({
			moment_id: id,
			user_id: auth.current.user.id
		});
		return data;
	}
}

module.exports = MviewController;
