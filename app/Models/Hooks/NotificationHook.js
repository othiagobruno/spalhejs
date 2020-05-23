'use strict';

const Ws = use('Ws');
const Notification = use('App/Models/Notification');

const NotificationHook = (exports = module.exports = {});
NotificationHook.method = async (modelInstance) => {};

NotificationHook.sendWs = async (ntf) => {
	const topic = Ws.getChannel('notification:*').topic(`notification:${ntf.my_userid}`);
	if (topic) {
		const n = await Notification.query().where('id', ntf.id).orderBy('id', 'desc').with('user').first();

		topic.broadcast('message', n);
	} else {
		console.log('não consegui conectar ao cliente');
	}
};
