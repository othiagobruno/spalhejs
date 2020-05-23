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
	}

	async destroy({ auth }) {
		const user = auth.current.user;
		const notification = await Notification.query().where('my_userid', user.id).delete();
		return notification;
	}
}

module.exports = NotificationController;
