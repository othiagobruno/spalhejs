const axios = require('axios').default;

/** @type {import('@adonisjs/framework/src/Env')} */

const Ws = use('Ws');
const Notification = use('App/Models/Notification');
const User = use('App/Models/User');
const Env = use('Env');

const NotificationHook = (exports = module.exports = {});

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

  const sendNotification = {
    notification: {
      title: me.name,
      body: title,
    },
    to: user.token,
  };
  // SEND MESSAGIING
  axios.post('https://fcm.googleapis.com/fcm/send', sendNotification, {
    headers: {
      Authorization: `key=${key}`,
      'Content-Type': 'application/json',
    },
  });
};

NotificationHook.sendWs = async (notification) => {
  const uid = notification.my_userid;
  const topic = Ws.getChannel('notification:*').topic(`notification:${uid}`);

  if (topic) {
    const notification_message = await Notification.query()
      .where({ id: notification.id })
      .with('user')
      .with('followed', (builder) => {
        builder.where('followid', notification.user_id);
      })
      .first();

    topic.broadcast('message', notification_message);
  } else {
    console.log('não consegui conectar ao cliente');
  }
};
