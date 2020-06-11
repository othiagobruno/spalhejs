'use strict';

const Mview = use('App/Models/Mview');

class MviewController {
	async show({ auth, params }) {
		const id = params.id;
		const mview = await Mview.query().where('moment_id', id).with('user').fetch();
		return mview;
	}

	async count({ auth, params }) {
		const id = params.id;
		const mview = await Mview.query().where('moment_id', id).with('user').getCount();
		return mview;
	}

	async store({ params, auth }) {
		const id = params.id;
		const user = auth.current.user;
		const mview = await Mview.query().where('moment_id', id).where('user_id', user.id).first();

		if (!mview) {
			const data = await Mview.create({
				moment_id: id,
				user_id: auth.current.user.id
			});
			return data;
		} else {
			return mview;
		}
		// if (mview) {
		// 	return mview;
		// } else {
		//
		// }
	}
}

module.exports = MviewController;
