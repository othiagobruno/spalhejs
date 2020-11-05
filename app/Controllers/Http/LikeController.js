const Like = use('App/Models/Like');
const Notification = use('App/Models/Notification');
const Post = use('App/Models/Post');

class LikeController {
  async store({ auth, request, response }) {
    const { user } = auth.current;
    const post_id = request.input('post_id');
    const post = await Post.find(post_id);

    const like = await Like.query()
      .where('post_id', post_id)
      .where('user_id', user.id)
      .getCount();
    if (like) {
      await Like.query()
        .where('user_id', user.id)
        .where('post_id', post_id)
        .delete();
    } else {
      const newLike = await Like.create({ user_id: user.id, post_id });
      // INSERE A NOTIFICAÇÃO
      if (newLike && post.user_id !== user.id) {
        const data = {
          type: 'like',
          post_id,
          user_id: user.id,
          view: false,
          my_userid: post.user_id,
        };
        await Notification.create(data);
      }
    }

    return response.json({
      status: 'success',
      data: like,
    });
  }

  async show({ params }) {
    const { id } = params;
    const likes = await Like.query().where('post_id', id).with('user').fetch();
    return likes;
  }
}

module.exports = LikeController;
