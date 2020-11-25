const User = use('App/Models/User');
const Ws = use('Ws');

const StatusChangeHook = (exports = module.exports = {});

StatusChangeHook.send = async (id) => {
  const topic = Ws.getChannel('status:*').topic(`status:${id}`);

  if (topic) {
    const notification_message = await User.query()
      .where({ id })
      .with('user')
      .first();
    topic.broadcast('status', notification_message);
  } else {
    console.log('não consegui conectar ao cliente');
  }
};
