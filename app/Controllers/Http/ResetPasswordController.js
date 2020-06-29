'use strict';

const User = use('App/Models/User');
const Token = use('App/Models/Token');

const { addHours, parseISO, isAfter } = require('date-fns');

class ResetPasswordController {
  async verify({ request, response }) {
    try {
      const { token, email } = request.all();

      const user = await User.query()
        .where({ email })
        .with('tokens', (builder) => {
          builder.where({ type: 'forgot' }).where({ token });
        })
        .first();

      const tokenUser = user.toJSON().tokens[0];

      if (
        !tokenUser ||
        isAfter(new Date(), addHours(parseISO(tokenUser.created_at), 1))
      ) {
        return response.status(400).json({ token_is_valid: false });
      }

      return response.status(200).json({ token_is_valid: true });
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when validating token and email' });
    }
  }

  async update({ request, response }) {
    try {
      const { token, email, password } = request.all();

      const user = await User.query()
        .where({ email })
        .with('tokens', (builder) => {
          builder.where({ type: 'forgot' }).where({ token });
        })
        .first();

      const tokenUser = user.toJSON().tokens[0];

      if (
        !tokenUser ||
        isAfter(new Date(), addHours(parseISO(tokenUser.created_at), 1))
      ) {
        return response.status(400).json({ token_is_valid: false });
      }

      user.password = password;
      await user.save();

      await Token.query()
        .where({ type: 'forgot' })
        .where({ token: tokenUser.token })
        .delete();

      return response.status(200).send();
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when changing password' });
    }
  }
}

module.exports = ResetPasswordController;
