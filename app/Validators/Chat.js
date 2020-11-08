const Antl = use('Antl');

class Chat {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      id_received: 'required|integer',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Chat;
