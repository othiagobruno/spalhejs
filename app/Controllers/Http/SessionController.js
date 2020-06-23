"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();
    const { token } = await auth.attempt(email, password);
    const user = await User.query()
      .where("id", params.id)
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
