const { rule } = use('Validator');
const Antl = use('Antl');

class Login {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      // validation rules
      email: [rule('required'), rule('email')],
      password: [rule('required'), rule('string')],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Login;
