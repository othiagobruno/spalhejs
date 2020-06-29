'use strict';

const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Mail = use('Mail');

class ForgotController {
  async store({ request, response }) {
    try {
      const { email } = request.all();
      const user = await User.findBy('email', email);

      const name = user.name.split(' ')[0];
      const token = Math.floor(Math.random() * (999999 - 100000)) + 1000000;

      await Token.create({
        type: 'forgot',
        user_id: user.id,
        token,
      });

      await Mail.send('emails.forgot-password', { name, token }, (message) => {
        message
          .to(user.email)
          .from('suporte@spalhe.com.br', 'Suporte | Spalhe')
          .subject('Pedido de redefinição de senha');
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = ForgotController;
