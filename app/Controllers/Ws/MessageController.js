'use strict';

class MessageController {
	constructor({ socket, request }) {
		this.socket = socket;
		this.request = request;
	}

	onMessage(message) {
		this.socket.broadcastToAll(message);
	}
	onClose() {
		console.log('saiu ', this.socket.topic);
	}
}

module.exports = MessageController;
