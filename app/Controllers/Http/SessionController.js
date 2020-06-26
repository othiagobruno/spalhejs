"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();
    const { token } = await auth.attempt(email, password);

    // exibe os dados do usuário
    const user = await User.query()
      .where("email", email)
      .withCount("following")
      .withCount("followers")
      .withCount("posts")
      .firstOrFail();

    return {
      token,
      user,
    };
  }
}

module.exports = SessionController;
