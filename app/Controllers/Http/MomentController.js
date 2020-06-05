'use strict';

const Moment = use('App/Models/Moment');

class MomentController {
	async index({ auth }) {
		const user = auth.current.user;
		const follows = await user.following().ids();
		follows.push(user.id);
		const moments = await Moment.query().whereIn('user_id', follows).with('user').orderBy('id', 'desc').fetch();
		return moments;
	}

	async store({ auth, request }) {
		const data = request.only([ 'midia', 'type', 'text' ]);
		const result = auth.user.moments().create(data);
		return result;
	}

	async show({ params }) {
		const id = params.id;
		const moments = await Moment.query().where('id', id).with('user').fetch();
		return moments;
	}
}

module.exports = MomentController;
