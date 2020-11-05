const MomentLike = use('App/Models/MomentLike');
const Moment = use('App/Models/Moment');
const Notification = use('App/Models/Notification');

class LikeMomentController {
  async store({ params, response, auth }) {
    try {
      const user_id = auth.user.id;
      const moment_id = params.id;

      const checkLiked = await MomentLike.query()
        .where({ moment_id })
        .where({ user_id })
        .first();

      if (checkLiked) {
        await checkLiked.delete();
        return response.status(200).send();
      }

      await MomentLike.create({
        user_id,
        moment_id,
      });

      const moment = await Moment.find(moment_id);

      if (moment.user_id !== auth.user.id) {
        const data = {
          type: 'like_moment',
          post_id: moment_id,
          user_id,
          view: false,
          my_userid: moment.user_id,
        };

        await Notification.create(data);
      }

      return response.status(201).send();
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when giving like/dislike' });
    }
  }

  async index({ params, response }) {
    try {
      const likes = await MomentLike.query()
        .where({ moment_id: params.id })
        .with('user', (builder) => {
          builder.select('id', 'name', 'username', 'avatar');
        })
        .fetch();

      return likes;
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when loading list of likes' });
    }
  }
}

module.exports = LikeMomentController;
