const Ws = use('Ws');
const Chat = use('App/Models/Chat');

const MessageHook = (exports = module.exports = {});
MessageHook.send = async (msg) => {
  const topic = Ws.getChannel('message:*').topic(`message:${msg.chat_id}`);
  if (topic) {
    topic.broadcast('message', msg);
  }
};

MessageHook.get = async (msg) => {
  const topic = await Ws.getChannel('chat:*').topic(`chat:${msg.id_received}`);
  const topic2 = await Ws.getChannel('chat:*').topic(`chat:${msg.id_send}`);

  const chat_list = await Chat.query()
    .where({ id: msg.chat_id })
    .with('messages', (builder) => builder.orderBy('id', 'desc').limit(1))
    .withCount('messages', (builder) =>
      builder.whereNot('view', 0).where({ id_received: msg.id_received })
    )
    .with('user_one', (builder) => builder.select('id', 'name'))
    .with('user_two', (builder) => builder.select('id', 'name'))
    .first();

  if (topic) {
    topic.broadcast('message', chat_list);
  } else if (topic2) {
    topic2.broadcast('message', chat_list);
  }
};
