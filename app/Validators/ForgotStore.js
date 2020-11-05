class ForgotPasswordStore {
  get rules() {
    return {
      email: 'required|email|exists:users,email',
    };
  }
}

module.exports = ForgotPasswordStore;
