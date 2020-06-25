"use strict";

const crypto = require("crypto");
const { subDays, isAfter } = require("date-fns");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);
      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();
      await user.save();
      await Mail.send(
        ["emails.forgot_password"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from("suporte@spalhe.com.br", "Suporte | Spalhe")
            .subject("Recuperação de senha");
        }
      );
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo nao deu certo, esse email existe?" } });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();
      const user = await User.findByOrFail("token", token);
      const tokenExpired = isAfter(
        subDays(new Date(), 2),
        user.token_created_at
      );
      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: "O token de recuperacao expirou." } });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo deu errado ao resetar sua senha" } });
    }
  }
}

module.exports = ForgotController;
