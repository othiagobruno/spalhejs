'use strict';

const Ws = use('Ws');

Ws.channel('notification:*', 'NotificationController');
Ws.channel('message:*', 'MessageController');
Ws.channel('chat:*', 'MessagelistController');
