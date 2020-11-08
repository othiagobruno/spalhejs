const Antl = use('Antl');

class Messages {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      text: 'required|string',
      id_received: 'required|integer',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Messages;
