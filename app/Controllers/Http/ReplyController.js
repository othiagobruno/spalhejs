'use strict';

const Reply = use('App/Models/Reply');
const Comment = use('App/Models/Comment');
const Notification = use('App/Models/Notification');

class ReplyController {
	async index({ response }) {}

	async store({ params, auth, request }) {
		const id = params.id;
		const user = auth.current.user;
		const cm = await Comment.find(id);
		const { text } = request.only([ 'text' ]);
		const data = await Reply.create({ text, user_id: user.id, comment_id: Number(id) });
		if (data && cm.user_id !== user.id) {
			const data = { type: 'reply', post_id: id, user_id: user.id, view: false, my_userid: cm.user_id };
			await Notification.create(data);
		}
		return data;
	}

	async show({ params, auth }) {
		const id = params.id;
		const data = await Reply.query().where('comment_id', id).with('user').fetch();
		return data;
	}
}

module.exports = ReplyController;
