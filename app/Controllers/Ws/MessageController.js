class MessageController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  onMessage(message) {
    console.log(message);
    this.socket.broadcast(message);
  }

  onClose() {
    console.log('saiu de message controller ', this.socket.topic);
  }
}

module.exports = MessageController;
