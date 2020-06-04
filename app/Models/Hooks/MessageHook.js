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
	const topic2 = Ws.getChannel('chat:*').topic(`chat:${msg.id_send}`);

	if (topic || topic2) {
		topic.broadcast('message', new Date());
		topic2.broadcast('message', new Date());
	} else {
		console.log('não consegui conectar ao cliente');
	}
};
