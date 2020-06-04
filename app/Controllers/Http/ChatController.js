'use strict';

const Chat = use('App/Models/Chat');
const User = use('App/Models/User');
const Message = use('App/Models/Message');

class ChatController {
	async index({ auth }) {
		const user = auth.current.user;
		const msg = await Chat.query().where('id_received', user.id).orWhere('id_send', user.id).fetch();

		var data = [];
		for (let i in msg.rows) {
			const x = msg.rows[i];
			if (x.id_received != user.id) {
				const user = await User.find(x.id_received);
				const last = await Message.findBy('idmsg', x.id).last();
				data.push({
					idmsg: x.id,
					name: user.name,
					avatar: user.avatar,
					created_at: x.created_at,
					last
				});
			} else {
				const user = await User.find(x.id_send);
				const last = await Message.findBy('idmsg', x.id).last();
				data.push({
					idmsg: x.id,
					name: user.name,
					avatar: user.avatar,
					created_at: x.created_at,
					last
				});
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
