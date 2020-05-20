'use strict';

class NotificationController {
	constructor({ socket, request }) {
		this.socket = socket;
		this.request = request;
		console.log('A new subscription for room topic', socket.topic);
	}

	onMessage(message) {
		console.log('n: ', message);
	}

	onClose() {
		console.log('n close: ', this.socket.topic);
	}
}

module.exports = NotificationController;
