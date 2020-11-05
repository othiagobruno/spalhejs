const User = use('App/Models/User');
const Notification = use('App/Models/Notification');
const Follow = use('App/Models/Follow');
const Database = use('Database');

class FollowController {
  // SEGUIR UM USUÁRIO
  async follow({ params, auth, response }) {
    const { user } = auth.current;
    if (auth.user.id === params.id) {
      return response.json({
        error: 'dont follow yourself',
      });
    }
    // NOTIFICATION CREATE
    const data = {
      type: 'follow',
      post_id: false,
      user_id: user.id,
      view: false,
      my_userid: params.id,
    };
    await Notification.create(data);
    await user.following().attach(params.id);
    return response.json({
      status: 'success',
    });
  }

  // DEIXAR DE SEGUIR
  async unFollow({ params, auth, response }) {
    const { user } = auth.current;
    if (auth.user.id === params.id) {
      return response.json({
        error: 'dont unfollow yourself',
      });
    }
    await user.following().detach(params.id);
    return response.json({
      status: 'success',
    });
  }

  async showFollowing({ params }) {
    const { id } = params;
    const data = await Follow.query()
      .where('followid', id)
      .with('user')
      .fetch();

    return data;
  }

  async showFollowers({ params }) {
    const { id } = params;
    const data = await Follow.query()
      .where('user_id', id)
      .with('user_followers')
      .fetch();
    return data;
  }

  // USUARIOS QUE EU NÃO SIGO
  async usersToFollow({ auth }) {
    const { user } = auth.current;
    const usersAlreadyFollowing = await user.following().ids();
    const usersToFollow = await User.query()
      .whereNot('id', user.id)
      .whereNotIn('id', usersAlreadyFollowing)
      .orderBy(Database.raw('RAND()'))
      .pick(20);
    return usersToFollow;
  }
}

module.exports = FollowController;
