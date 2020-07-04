'use strict';
const { rule } = use('Validator');

class ForgotPasswordUpdate {
  get rules() {
    return {
      token: 'required|notExists:tokens,token',
      email: 'required|email|notExists:users,email',
      password: [
        rule('required'),
        rule('string'),
        rule('regex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ],
    };
  }
}

module.exports = ForgotPasswordUpdate;
