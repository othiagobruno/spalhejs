class ResetPasswordVerify {
  get rules() {
    return {
      token: 'required|exists:tokens,token',
      email: 'required|email|exists:users,email',
    };
  }
}

module.exports = ResetPasswordVerify;
