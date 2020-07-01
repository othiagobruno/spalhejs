'use strict';

const User = use('App/Models/User');

class UserController {
  async store({ request, response, auth }) {
    try {
      const data = request.only(['name', 'username', 'email', 'password']);
      const user = await User.create({
        ...data,
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/spalhe-app.appspot.com/o/usericon.png?alt=media&token=2c333530-8c82-4d6f-a1ba-dca6410c2036',
      });

      const { token } = await auth.attempt(data.email, data.password);
      return response.status(201).json({ token, user });
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when creating new user' });
    }
  }

  async index() {
    const users = await User.all();
    return users;
  }

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
      return response.status(404).json({ error: 'user not found' });
    }
  }

  async update({ request, response, auth }) {
    try {
      const data = request.only(['name', 'username', 'biography', 'website']);
      const id = auth.user.id;

      const user = await User.findOrFail(id);
      const verifyUsername = await User.findBy({ username: data.username });

      if (verifyUsername && verifyUsername.id !== id) {
        return response.status(409).json({
          error: 'this username is already being used on another account',
        });
      }

      user.merge(data);
      await user.save();

      const data = await User.query()
        .where('id', id)
        .withCount('following')
        .withCount('followers')
        .withCount('posts')
        .firstOrFail();

      return { user: data };
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when updating user data' });
    }
  }
}

module.exports = UserController;
