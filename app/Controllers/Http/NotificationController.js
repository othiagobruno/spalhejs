'use strict';

const Notification = use('App/Models/Notification');

class NotificationController {
	async index({ auth }) {
		const user = auth.current.user;
		const notifications = await Notification.query().where('my_userid', user.id).with('user').fetch();
		return notifications;
	}

	async store({ request, params, auth }) {
		const user = auth.current.user;
		const request_data = request.only([ 'type', 'post_id' ]);
		const data = { ...request_data, my_userid: Number(params.id), user_id: Number(user.id), view: false };
		const notifications = await Notification.create(data);
		return notifications;
	}

	async setView({ response, request, params }) {
		//
	}
}

module.exports = NotificationController;
