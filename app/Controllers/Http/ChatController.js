'use strict';

const Chat = use('App/Models/Chat');
const User = use('App/Models/User');
const md5 = require('md5');

class ChatController {
	async index({ auth }) {
		const user = auth.current.user;
		const msg = await Chat.query().where('id_received', user.id).orWhere('id_send', user.id).fetch();

		var data = [];
		for (let i in msg.rows) {
			if (msg[i].id_received != user.id) {
				const user = await User.find(msg[i].id_received);
				data.push({ ...msg[i], user });
			} else {
				const user = await User.find(msg[i].id_received);
				data.push({ ...msg[i], user });
			}
		}

		return data;
	}

	async show({ auth }) {}

	async store({ request }) {
		const { id_received, id_send } = request.all();
		try {
			const msg = await Chat.query()
				.whereIn('id_received', [ id_send, id_received ])
				.whereIn('id_send', [ id_send, id_received ])
				.firstOrFail();
			return { status: 'chat', data: msg };
		} catch (error) {
			const chat = await Chat.create({ id_received, id_send });
			return chat;
		}
	}

	async update({ auth }) {}
}

module.exports = ChatController;
