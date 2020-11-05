const Ws = use('Ws');

const MessageHook = (exports = module.exports = {});

MessageHook.send = async (msg) => {
  const topic = Ws.getChannel('message:*').topic(`message:${msg.id_msg}`);
  if (topic) {
    const x = msg;
    const data = {
      _id: x.id,
      idmsg: x.id_msg,
      text: x.text,
      createdAt: x.created_at,
      user: {
        _id: Number(x.id_send),
      },
      view: false,
    };

    topic.broadcast('message', data);
  } else {
    console.log('não consegui conectar ao cliente');
  }
};

MessageHook.get = async (msg) => {
  const topic = await Ws.getChannel('chat:*').topic(`chat:${msg.id_received}`);
  const topic2 = await Ws.getChannel('chat:*').topic(`chat:${msg.id_send}`);

  if (topic) {
    topic.broadcast('message', new Date());
  }

  if (topic2) {
    topic2.broadcast('message', new Date());
  }
};
