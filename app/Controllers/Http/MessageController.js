const Message = use('App/Models/Message');

class MessageController {
  async show({ response, params }) {
    const chat_id = params.id;
    const message = await Message.query()
      .where({ chat_id })
      .orderBy('id', 'desc')
      .fetch();
    return response.status(200).send(message);
  }

  async store({ request, response, auth, params }) {
    const { user } = auth.current;
    const chat_id = params.id;
    const request_data = request.only(['text', 'id_received']);
    const dataFormated = {
      ...request_data,
      id_send: user.id,
      view: 0,
      chat_id,
    };
    const message = await Message.create(dataFormated);
    return response.status(200).send(message);
  }

  async update({ response, auth, params }) {
    const chat_id = params.id;
    const { user } = auth.current;
    const message = await Message.query()
      .where({ chat_id })
      .where('id_received', user.id)
      .update({
        view: 1,
      });
    return response.status(200).send(message);
  }
}

module.exports = MessageController;
