'use strict';
const axios = require('axios').default;

/** @type {import('@adonisjs/framework/src/Env')} */

const Ws = use('Ws');
const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const Env = use('Env');

const NotificationHook = (exports = module.exports = {});
NotificationHook.method = async (modelInstance) => {};

NotificationHook.sendPush = async (notification) => {
  const user = await User.find(notification.my_userid);
  const me = await User.find(notification.user_id);
  const key = Env.get('GOOGLE_APIKEY');

  const typeNotification = {
    like: 'curtiu sua publicação',
    comment: 'comentou sua publicação',
    reply: 'respondeu seu comentário',
    share: 'spalhou sua publicação',
    comment_like: 'curtiu seu comentário',
    follow: 'seguiu você',
    comment_moment: 'comentou seu moment',
    like_moment: 'curtiu seu moment',
  };

  const title = typeNotification[notification.type];

  var notification = {
    notification: {
      title: me.name,
      body: title,
    },
    to: user.token,
  };
  // SEND MESSAGIING
  axios.post('https://fcm.googleapis.com/fcm/send', notification, {
    headers: {
      Authorization: 'key=' + key,
      'Content-Type': 'application/json',
    },
  });
};

NotificationHook.sendWs = async (ntf) => {
  const topic = Ws.getChannel('notification:*').topic(
    `notification:${ntf.my_userid}`
  );
  if (topic) {
    const n = await Notification.query()
      .where('my_userid', ntf.my_userid)
      .orderBy('id', 'desc')
      .with('user')
      .pick(15);
    topic.broadcast('message', n);
  } else {
    console.log('não consegui conectar ao cliente');
  }
};
