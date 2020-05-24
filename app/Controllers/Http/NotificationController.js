'use strict';

const Notification = use('App/Models/Notification');

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

	async store({ params, auth }) {
		const user = auth.current.user;
		if (Number(user.id) === Number(params.id)) {
			return { status: 'error', message: 'dont send notifications for yourserf' };
		}
	}

	async update({ auth }) {
		const user = auth.current.user;
		const ntf = await Notification.query().where('my_userid', user.id).update({ view: true });
		return ntf;
	}

	async destroy({ auth }) {
		const user = auth.current.user;
		const notification = await Notification.query().where('my_userid', user.id).delete();
		return notification;
	}
}

module.exports = NotificationController;
