'use strict';

class ResetPasswordVerify {
  get rules() {
    return {
      token: 'required|notExists:tokens,token',
      email: 'required|email|notExists:users,email',
    };
  }
}

module.exports = ResetPasswordVerify;
