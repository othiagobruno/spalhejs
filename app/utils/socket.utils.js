const Ws = use('Ws');

function broadcast(id, type, data) {
	const channel = Ws.getChannel('notifications:*');
	if (!channel) return;

	const topic = channel.topic(`notifications:${id}`);
	if (!topic) {
		console.error('não ha notificações');
		return;
	}

	// emit, broadcast, broadcastToAll
	topic.broadcastToAll(`message`, {
		type,
		data
	});
}

module.exports = {
	broadcast
};
