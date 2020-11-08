class ForgotPasswordStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email|exists:users,email',
    };
  }
}

module.exports = ForgotPasswordStore;
