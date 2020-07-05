'use strict';

const Moment = use('App/Models/Moment');
const User = use('App/Models/User');
const subDays = require('date-fns/subDays');

class MomentController {
  async store({ request, response, auth }) {
    try {
      const data = request.only(['type', 'text']);
      const moment = await auth.user.moments().create(data);
      return response.status(201).json(moment);
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when creating new moment' });
    }
  }

  async index({ response, auth }) {
    try {
      const user = auth.user;
      const follows = await user.following().ids();
      const subDay = subDays(new Date(), 1);

      follows.push(user.id);

      const moments = await User.query()
        .whereIn('id', follows)
        .select(['id', 'name', 'username', 'avatar'])
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
}

module.exports = MomentController;
