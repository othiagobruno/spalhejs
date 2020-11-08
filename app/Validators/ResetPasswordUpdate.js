const { rule } = use('Validator');

class ForgotPasswordUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required|exists:tokens,token',
      email: 'required|email|exists:users,email',
      password: [
        rule('required'),
        rule('string'),
        rule('regex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ],
    };
  }
}

module.exports = ForgotPasswordUpdate;
