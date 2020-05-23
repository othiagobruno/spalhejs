'use strict';

const Notification = use('App/Models/Notification');
const User = use('App/Models/User');

class NotificationController {
	async index({ auth }) {
		const user = auth.current.user;
		const notifications = await Notification.query()
			.where('my_userid', user.id)
			.orderBy('id', 'desc')
			.with('user')
			.pick(12);

		return notifications;
	}

	async store({ request, params, auth }) {
		const user = auth.current.user;

		if (Number(user.id) === Number(params.id)) {
			return { status: 'error', message: 'dont send notifications for yourserf' };
		}

		const request_data = request.only([ 'type', 'post_id' ]);
		const data = { ...request_data, my_userid: Number(params.id), user_id: Number(user.id), view: true };
		const notifications = await Notification.create(data);
		return notifications;
	}

	async setView({ response, request, params }) {
		//
	}
}

module.exports = NotificationController;
