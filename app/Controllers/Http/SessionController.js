const User = use('App/Models/User');

class SessionController {
  async store({ request, auth, response }) {
    try {
      const { email, password } = request.all();
      const { token } = await auth.attempt(email, password);
      const user = await User.query().where('email', email).firstOrFail();
      return {
        token,
        user,
      };
    } catch (e) {
      if (e.name === 'UserNotFoundException') {
        return response.status(401).send({
          status: 401,
          title: 'Parece que o email não existe',
          message: 'Não econtramos uma conta para esse email',
        });
      }

      if (e.name === 'PasswordMisMatchException') {
        return response.status(401).send({
          status: 401,
          title: 'Sua senha está incorreta',
          message:
            'Antes de continuar, verifique se você digitou corretamente sua senha',
        });
      }
    }
  }
}

module.exports = SessionController;
