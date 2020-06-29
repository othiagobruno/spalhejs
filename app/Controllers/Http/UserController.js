'use strict';

const User = use('App/Models/User');

class UserController {
  // SHOW ALL USERS
  async index() {
    const users = await User.all();
    return users;
  }

  // SHOW USER BY ID
  async show({ params, response, auth }) {
    try {
      const user = await User.query()
        .where('id', params.id)
        .withCount('following')
        .withCount('followers')
        .with('followed', (builder) => {
          builder.where('followid', auth.user.id);
        })
        .withCount('posts')
        .firstOrFail();

      return user;
    } catch (err) {
      return response.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }
  }

  // CREATE USER
  async store({ request, response, auth }) {
    const data = request.only(['name', 'username', 'email', 'password']);
    const dados = {
      ...data,
      avatar: 'https://spalhe-profiles.s3-sa-east-1.amazonaws.com/usericon.png',
    };
    const user = await User.findOrCreate(
      { email: data.email, password: data.password },
      dados
    );
    if (user) {
      const { token } = await auth.attempt(data.email, data.password);
      const user = await User.findBy('email', data.email);
      return {
        token,
        user,
      };
    } else {
      return response
        .status(400)
        .send({ status: 'não foi possivel criar sua conta' });
    }
  }

  // UPDATE USER
  async update({ request, params, auth }) {
    const id = auth.current.user.id;
    const { ...data } = request.only([
      'name',
      'username',
      'email',
      'password',
      'avatar',
      'private',
      'biography',
    ]);
    const user = await User.findOrFail(id);
    user.merge(data);
    await user.save();

    // exibe os dados do usuário
    const userdata = await User.query()
      .where('id', id)
      .withCount('following')
      .withCount('followers')
      .withCount('posts')
      .firstOrFail();
    return userdata;
  }
}

module.exports = UserController;
