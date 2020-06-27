'use strict';

const MomentComment = use('App/Models/MomentComment');
const Moment = use('App/Models/Moment');
const Notification = use('App/Models/Notification');

class MomentCommentController {
  async store({ params, request, response, auth }) {
    try {
      const { text } = request.all();
      await MomentComment.create({
        user_id: auth.user.id,
        moment_id: params.id,
        text,
      });

      const moment = await Moment.find(params.id);

      if (moment.user_id !== auth.user.id) {
        const data = {
          type: 'comment_moment',
          post_id: params.id,
          user_id: auth.user.id,
          view: false,
          my_userid: moment.user_id,
        };

        await Notification.create(data);
      }

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json({ error: 'error when posting comment' });
    }
  }

  async index({ params, response }) {
    try {
      const comments = await MomentComment.query()
        .where('moment_id', params.id)
        .with('user', (builder) => {
          builder.select('id', 'name', 'username', 'created_at', 'avatar');
        })
        .orderBy('created_at', 'desc')
        .fetch();

      return comments;
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async delete({ params, response, auth }) {
    try {
      const comment = await MomentComment.query()
        .where('id', params.id)
        .first();

      if (comment.user_id !== auth.user.id) {
        return response
          .status(403)
          .json({ error: 'action not allowed for this user' });
      }

      await MomentComment.query().where('id', params.id).delete();

      return response.status(200).send();
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'error when deleting comment' });
    }
  }
}

module.exports = MomentCommentController;
