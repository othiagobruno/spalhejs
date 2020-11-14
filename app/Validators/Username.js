const { rule } = use('Validator');
const Antl = use('Antl');

class username {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: [
        rule('required'),
        rule('string'),
        rule('regex', /^(?=[a-z._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/gim),
        rule('unique', 'users'),
      ],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = username;
