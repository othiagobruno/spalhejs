'use strict';

const Message = use('App/Models/Message');
var md5 = require('md5');

class MessageController {
	async index({ request }) {}

	async store({ request, auth }) {
		const user = auth.current.user;
		const request_data = request.only([ 'text', 'id_received', 'image', 'audio', 'id_msg' ]);
		const data = { ...request_data, id_send: user.id };
		const msg = await Message.create(data);
		return msg;
	}

	async show({ params, auth }) {
		const id_msg = params.id;
		const msg = await Message.query().where('id_msg', id_msg).fetch();

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
				view: false
			});
		}

		return data;
	}

	async update({ request }) {}

	async destroy({ request }) {}
}

module.exports = MessageController;
