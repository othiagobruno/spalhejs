'use strict';

const Ws = use('Ws');
const NotificationHook = (exports = module.exports = {});
NotificationHook.method = async (modelInstance) => {};

NotificationHook.sendWs = async (notifications) => {
	const topic = Ws.getChannel('notification:*').topic(`notification:${notifications.my_userid}`);
	if (topic) {
		topic.broadcast('message', notifications);
	} else {
		console.log('não consegui conectar ao cliente');
	}
};
