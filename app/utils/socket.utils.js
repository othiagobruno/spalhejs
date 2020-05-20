const Ws = use('Ws');

function broadcast(id, type, data) {
	const channel = Ws.getChannel('notifications:*');
	if (!channel) return;

	const topic = channel.topic(`notifications:1`);

	if (topic) {
		topic.broadcast(`message`, data);
		console.log('foooooooi');
	} else {
		console.log(' não foooooooi');
	}
}

module.exports = {
	broadcast
};
