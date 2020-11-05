const Comment = use('App/Models/Comment');
const Post = use('App/Models/Post');
const Notification = use('App/Models/Notification');

class CommentController {
  async index({ auth, params, response }) {
    const { user } = auth.current;
    try {
      const post = await Comment.query()
        .where('id', params.id)
        .with('user', (builder) => {
          builder.setVisible(['id', 'name', 'username', 'avatar']);
        })
        .withCount('reply')
        .with('liked', (builder) => {
          builder.where('user_id', user.id).setVisible(['id']);
        })
        .withCount('likes')
        .fetch();
      return post;
    } catch (error) {
      return response.send({ error: 'cant find post comments' });
    }
  }

  async show({ auth, params, response }) {
    const { user } = auth.current;
    try {
      const post = await Comment.query()
        .where('post_id', params.id)
        .with('user', (builder) => {
          builder.setVisible(['id', 'name', 'username', 'avatar']);
        })
        .withCount('reply')
        .with('liked', (builder) => {
          builder.where('user_id', user.id).setVisible(['id']);
        })
        .withCount('likes')
        .fetch();
      return post;
    } catch (error) {
      return response.send({ error: 'cant find post comments' });
    }
  }

  async store({ auth, request }) {
    const { user } = auth.current;
    const dataReq = request.only(['post_id', 'text']);
    const data = { ...dataReq, user_id: user.id };
    const comment = await Comment.create(data);
    const post = await Post.find(dataReq.post_id);

    if (comment && post.user_id !== user.id) {
      const newData = {
        type: 'comment',
        post_id: post.id,
        user_id: user.id,
        view: false,
        my_userid: post.user_id,
      };
      await Notification.create(newData);
    }

    return comment;
  }

  async destroy({ auth, params, response }) {
    const cm = await Comment.query()
      .where('id', params.id)
      .where('user_id', auth.current.user.id)
      .first();
    if (!cm) {
      return response.status(404).send('não encontramos esse comentário');
    }
    await cm.delete();
  }
}

module.exports = CommentController;
