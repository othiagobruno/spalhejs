'use strict';

const Message = use('App/Models/Message');

class MessageController {
	async index({ request }) {}

	async store({ request, auth }) {
		const user = auth.current.user;
		const request_data = request.only([ 'text', 'id_received', 'image', 'audio', 'id_msg' ]);
		const data = { ...request_data, id_send: user.id, view: false };
		const msg = await Message.create(data);
		return msg;
	}

	async show({ params, auth }) {
		const id_msg = params.id;
		const msg = await Message.query().where('id_msg', id_msg).orderBy('id', 'desc').fetch();

		let data = [];
		for (let i in msg.rows) {
			const x = msg.rows[i];

			data.push({
				_id: x.id,
				idmsg: x.id_msg,
				text: x.text,
				createdAt: x.created_at,
				user: {
					_id: Number(x.id_send)
				},
				view: x.view
			});
		}

		return data;
	}

	async update({ auth, params }) {
		const id_msg = params.id;
		const user = auth.current.user;
		const msg = await Message.query().where('id_msg', id_msg).where('id_received', user.id).update({
			view: true
		});
		return msg;
	}

	async destroy({ request }) {}
}

module.exports = MessageController;
