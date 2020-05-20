'use strict';

const Ws = use('Ws');

Ws.channel('notification:*', 'NotificationController');
