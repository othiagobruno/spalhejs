'use strict';

const Notification = use('App/Models/Notification');
const { broadcast } = require('../../utils/socket.utils');

class NotificationController {
	constructor({ socket, request }) {
		this.socket = socket;
		this.request = request;
	}

	onMessage(message) {
		console.log('n: ', message);
	}

	onClose() {
		console.log('n close: ', this.socket.topic);
	}
}

module.exports = NotificationController;
