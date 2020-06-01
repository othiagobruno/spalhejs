'use strict';

const Chat = use('App/Models/Chat');
const md5 = require('md5');

class ChatController {
	async index({ auth }) {
		const user = auth.current.user;
		const msg = await Chat.findBy('id_received', user.id).findBy('id_send', user.id);

		for (var i; msg.length < i; i++) {
			if (msg[i].id_received != user.id) {
				await msg.load('user', msg[i].send_id);
			} else {
				await msg.load('user', msg[i].id_received);
			}
		}

		return msg;
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
