const Moment = use('App/Models/Moment');
const User = use('App/Models/User');
const subDays = require('date-fns/subDays');

class MomentController {
  async index({ response, auth }) {
    try {
      const { user } = auth;
      const follows = await user.following().ids();
      const subDay = subDays(new Date(), 1);
      follows.push(user.id);
      const moments = await User.query()
        .whereIn('id', follows)
        .select(['id', 'name', 'username'])
        .whereHas(
          'moments',
          (builder) => {
            builder.where('created_at', '>', subDay);
          },
          '>',
          0
        )
        .with('moments', (builder) => {
          builder
            .where('created_at', '>', subDay)
            .withCount('likes')
            .withCount('comments')
            .withCount('views');
        })
        .orderBy('id', 'desc')
        .fetch();

      return moments;
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when fetching moments' });
    }
  }

  async store() {
    //
  }

  async show({ params }) {
    const { id } = params;
    const moments = await Moment.query().where('id', id).with('user').fetch();
    return moments;
  }

  async destroy({ params, auth, response }) {
    const { user } = auth.current;
    const { id } = params;

    try {
      const moment = await Moment.find(id);
      if (moment.user_id === user.id) {
        await moment.delete();
        return response.status(200).json({ status: 'deleted' });
      }
      return response
        .status(401)
        .json({ status: 'you are not allowed to delete' });
    } catch (error) {
      return response
        .status(500)
        .json({ status: 'internal server error or moment does not exist' });
    }
  }
}

module.exports = MomentController;
