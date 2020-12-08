const User = use('App/Models/User');
const UserAvatar = use('App/Models/UserAvatar');
class UserController {
  async store({ request, response, auth }) {
    const data = request.only(['name', 'username', 'email', 'password']);
    const user = await User.create(data);

    await UserAvatar.create({
      file: 'no_content/usericon.png',
      name: 'usericon.png',
      type: 'image',
      subtype: 'png',
      user_id: user.id,
    });

    const { token } = await auth.attempt(data.email, data.password);
    return response.status(201).json({ token, user });
  }

  async index() {
    const users = await User.all();
    return users;
  }

  async username({ request, auth, response }) {
    const { username } = request.all();
    const { user } = auth.current;
    const user_info = await User.findOrFail(user.id);
    const verifyUsername = await User.findBy({ username });
    if (verifyUsername && verifyUsername.id !== user.id) {
      return response.status(409).json({
        error:
          'Este nome de usuário já existe e está sendo usado por outra conta',
      });
    }
    user_info.username = username;
    user_info.save();
    return user_info;
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
      const data = request.only([
        'name',
        'username',
        'biography',
        'website',
        'avatar',
      ]);
      const { id } = auth.user;

      const user = await User.findOrFail(id);
      const verifyUsername = await User.findBy({ username: data.username });

      if (verifyUsername && verifyUsername.id !== id) {
        return response.status(409).json({
          error:
            'Este nome de usuário já existe e está sendo usado por outra conta',
        });
      }

      user.merge(data);
      await user.save();

      return user;
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when updating user data' });
    }
  }
}

module.exports = UserController;
