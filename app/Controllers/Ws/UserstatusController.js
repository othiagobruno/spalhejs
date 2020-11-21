const Database = use('Database');

class UserstatusController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  async onMessage(message) {
    const id = this.socket.topic.split(':')[1];
    await Database.table('users').where('id', id).update('status', true);
    this.socket.broadcastToAll(message);
  }

  async onClose() {
    const id = this.socket.topic.split(':')[1];
    await Database.table('users').where('id', id).update({ status: false });
  }
}

module.exports = UserstatusController;
