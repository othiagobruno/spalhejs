'use strict';
const axios = require('axios').default;

const Ws = use('Ws');
const Notification = use('App/Models/Notification');
const User = use('App/Models/User');

const NotificationHook = (exports = module.exports = {});
NotificationHook.method = async (modelInstance) => {};

NotificationHook.sendPush = async (notification) => {
	const user = await User.find(notification.my_userid);
	const me = await User.find(notification.user_id);
	const key =
		'AAAAaxQ7E_Q:APA91bE5bpGMzEdfc2TgaUl96cu9T0rZK0rzdTHaAPztYhHVpdpvky8ZQgcfPmnz-jTebwX_xRoNgEM2GGvznFa9XztdzvAxDkZGRYGqPnBIRBv-6fskONSJF2exJF0F7g0hPfD-SzaL';
	const title =
		notification.type === 'like'
			? 'curtiu'
			: notification.type === 'comment'
				? 'comentou'
				: notification.type === 'reply'
					? 'respondeu'
					: notification.type === 'comment_like'
						? 'curtiu seu comentário'
						: notification.type === 'share' ? 'spalhou' : false;

	var notification = {
		notification: {
			title: me.name,
			body: `${notification.type === 'reply'
				? title + ' o seu comentário'
				: notification.type === 'comment_like' ? title : title + ' sua publicação'}`
		},
		to: user.token
	};
	// SEND MESSAGIING
	axios.post('https://fcm.googleapis.com/fcm/send', notification, {
		headers: {
			Authorization: 'key=' + key,
			'Content-Type': 'application/json'
		}
	});
};

NotificationHook.sendWs = async (ntf) => {
	const topic = Ws.getChannel('notification:*').topic(`notification:${ntf.my_userid}`);
	if (topic) {
		const n = await Notification.query()
			.where('my_userid', ntf.my_userid)
			.orderBy('id', 'desc')
			.with('user')
			.pick(15);
		topic.broadcast('message', n);
	} else {
		console.log('não consegui conectar ao cliente');
	}
};
