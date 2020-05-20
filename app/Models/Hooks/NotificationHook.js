'use strict';

const Ws = use('Ws');
const Notification = use('App/Models/Notification');

const NotificationHook = (exports = module.exports = {});
NotificationHook.method = async (modelInstance) => {};

NotificationHook.sendWs = async (notifications) => {
	const topic = Ws.getChannel('notification:*').topic(`notification:${notifications.my_userid}`);
	if (topic) {
		const n = await Notification.query().where('my_userid', notifications.my_userid).with('users').fetch();
		topic.broadcast('message', n);
	} else {
		console.log('não consegui conectar ao cliente');
	}
};
