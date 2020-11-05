const { Ignitor } = require('@adonisjs/ignitor');

// const cluster = require('cluster');

// if (cluster.isMaster) {
// 	for (let i = 0; i < 4; i++) {
// 		cluster.fork();
// 	}
// 	require('@adonisjs/websocket/clusterPubSub')();
// 	return;
// }

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .wsServer() // boot the WebSocket server
  .fireHttpServer()
  .catch(console.error);
