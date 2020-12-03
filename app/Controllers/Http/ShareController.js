const Post = use('App/Models/Post');
const Share = use('App/Models/Share');
const Notification = use('App/Models/Notification');

class ShareController {
  async show({ params }) {
    const post = await Post.find(params.id);
    const share = await Share.query()
      .where('post_id', post.id)
      .with('user')
      .fetch();
    return share;
  }

  async store({ auth, params, response }) {
    const { user } = auth.current;
    const post = await Post.find(params.id);

    const postagem = post.post_id ? await Post.find(post.post_id) : post;

    await Share.create({
      user_id: user.id,
      post_id: postagem.id,
    });

    const data = await user.posts().create({
      share_id: postagem.user_id,
      post_id: postagem.id,
    });

    if (data && postagem.user_id !== user.id) {
      const data = {
        type: 'share',
        post_id: postagem.id,
        user_id: user.id,
        view: false,
        my_userid: postagem.user_id,
      };
      await Notification.create(data);
    }

    return response.json({
      status: 'success',
      message: data,
    });
  }
}

module.exports = ShareController;
