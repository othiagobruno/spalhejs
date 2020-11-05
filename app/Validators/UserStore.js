const { rule } = use('Validator');

class UserStore {
  get rules() {
    return {
      name: [
        rule('required'),
        rule('string'),
        rule('regex', /^[a-zA-Z ]{3,}$/i),
      ],
      username: [
        rule('required'),
        rule('string'),
        rule('regex', /^(?=[a-z_\d]*[a-z])[a-z._\d]{5,}$/gim),
        rule('unique', 'users'),
      ],
      email: 'required|email|unique:users',
      password: [rule('required'), rule('string')],
    };
  }
}

module.exports = UserStore;
