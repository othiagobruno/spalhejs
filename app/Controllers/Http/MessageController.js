'use strict';

const Message = use('App/Models/Message');
var md5 = require('md5');

class MessageController {
	async index({ request }) {}

	async store({ request, auth }) {
		const user = auth.current.user;
		const request_data = request.only([ 'text', 'id_received', 'image', 'audio' ]);
		const idmsg = md5(user.id) + md5(request_data.id_received);
		const data = { ...request_data, id_send: user.id, idmsg: idmsg };
		const msg = await Message.create(data);
		return msg;
	}

	async update({ request }) {}

	async destroy({ request }) {}
}

module.exports = MessageController;
