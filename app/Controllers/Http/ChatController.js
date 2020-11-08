const Chat = use('App/Models/Chat');

class ChatController {
  async index({ auth, response }) {
    try {
      const { user } = auth.current;
      const chat_list = await Chat.query()
        .where('id_received', user.id)
        .orWhere('id_send', user.id)
        .with('messages')
        .withCount('messages', (builder) => builder.whereNot('view', null))
        .with('user_one', (builder) => builder.select('id', 'name', 'avatar'))
        .with('user_two', (builder) => builder.select('id', 'name', 'avatar'))
        .fetch();
      return response.status(200).send(chat_list);
    } catch (error) {
      return response
        .status(400)
        .send([{ message: 'Erro ao buscar mensagens' }]);
    }
  }

  async store({ request, response, auth }) {
    const id_send = auth.user.id;
    const { id_received } = request.all();
    const msg = await Chat.query()
      .whereIn('id_received', [id_send, id_received])
      .whereIn('id_send', [id_send, id_received])
      .first();
    if (!msg) {
      if (id_received !== id_send) {
        const chat = await Chat.create({ id_received, id_send });
        return response.status(201).send({ message: 'success', data: chat });
      }
      return response
        .status(400)
        .send({ message: "you can't create chat message with yourself" });
    }
    return response.status(201).send({ message: 'success', data: msg });
  }
}

module.exports = ChatController;
