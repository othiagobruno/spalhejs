'use strict';
const Ws = use('Ws');
const Message = use('App/Models/Message');
const _ = use('lodash');

const MessageHook = (exports = module.exports = {});
MessageHook.method = async (modelInstance) => {};

MessageHook.send = async (msg) => {
	const topic = Ws.getChannel('message:*').topic(`message:${msg.id_msg}`);
	if (topic) {
		var x = msg;
		var data = {
			_id: x.id,
			idmsg: x.id_msg,
			text: x.text,
			createdAt: x.created_at,
			user: {
				_id: Number(x.id_send)
			},
			view: false
		};

		topic.broadcast('message', data);
	} else {
		console.log('não consegui conectar ao cliente');
	}
};

MessageHook.get = async (msg) => {
	const topic = Ws.getChannel('chat:*').topic(`chat:${msg.id_received}`);
	if (topic) {
		const msgList = await Message.query()
			.where('id_received', msg.id_received)
			.with('user', (builder) => {
				builder.where('id', msg.id_send);
			})
			.orderBy('id', 'desc')
			.fetch();

		topic.broadcast('message', msgList);
	} else {
		console.log('não consegui conectar ao cliente');
	}
};
