'use strict';

const Reply = use('App/Models/Reply');

class ReplyController {
	async index({ response }) {}

	async store({ params, auth, request }) {
		const id = params.id;
		const user = auth.current.user;
		const { text } = request.only([ 'text' ]);
		const data = await Reply.create({ text, user_id: user.id, comment_id: Number(id) });
		return data;
	}

	async show({ params, auth }) {
		const id = params.id;
		const data = await Reply.query().where('comment_id', id).with('user').fetch();
		return data;
	}
}

module.exports = ReplyController;
