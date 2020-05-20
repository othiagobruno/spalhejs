'use strict';

const Notification = use('App/Models/Notification');

class NotificationController {
	async index({ auth }) {
		const user = auth.current.user;
		// BUSCA AS NOTIFICAÇÕES PELO ID
		const notifications = Notification.query().where('my_userid', user.id).fetch();
		return notifications;
	}

	async store({ request, params, auth }) {
		const user = auth.current.user;
		const request_data = request.only([ 'type', 'post_id' ]);
		const data = { ...request_data, my_userid: params.id, user_id: user.id, view: false };
		const notifications = await Notification.create(data);
		return notifications;
	}

	async setView({ response, request, params }) {
		//
	}
}

module.exports = NotificationController;
