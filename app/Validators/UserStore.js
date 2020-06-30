'use strict';

const { rule } = use('Validator');

class UserStore {
  get rules() {
    return {
      name: 'required|string|min:3',
      username: [
        rule('required'),
        rule('string'),
        rule('regex', /^(?=[a-z_\d]*[a-z])[a-z._\d]{5,}$/gim),
        rule('unique', 'users'),
      ],
      email: 'required|email|unique:users',
      password: [
        rule('required'),
        rule('string'),
        rule('regex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ],
    };
  }
}

module.exports = UserStore;
