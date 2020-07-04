'use strict';

class ForgotPasswordStore {
  get rules() {
    return {
      email: 'required|email|notExists:users,email',
    };
  }
}

module.exports = ForgotPasswordStore;
