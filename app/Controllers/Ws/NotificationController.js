class NotificationController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  onMessage(message) {
    this.socket.broadcastToAll(message);
  }

  onClose() {}
}

module.exports = NotificationController;
