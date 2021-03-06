const { rule } = use('Validator');
const Antl = use('Antl');

class username {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: [rule('required'), rule('string')],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = username;
