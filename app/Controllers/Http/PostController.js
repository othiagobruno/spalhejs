const Post = use('App/Models/Post');

class PostController {
  async index({ auth, request }) {
    const { page } = request.all();
    const { user } = auth.current;
    const follows = await user.following().ids();
    follows.push(user.id);
    const posts = await Post.query()
      .whereIn('user_id', follows)
      .with('files')
      .with('liked', (builder) => builder.where('user_id', auth.user.id))
      .withCount('likes')
      .withCount('comments')
      .withCount('share')
      .with('share_post.post')
      .with('share_post.post.midias')
      .with('share_user')
      .with('user')
      .orderBy('id', 'desc')
      .paginate(page, 10);
    return posts;
  }

  async show({ params, auth }) {
    const { user } = auth.current;
    const post = await Post.query()
      .where('id', params.id)
      .with('files')
      .with('liked', (builder) => {
        builder.where('user_id', user.id);
      })
      .withCount('likes')
      .withCount('comments')
      .withCount('share')
      .with('share_post.post')
      .with('share_post.post.midias')
      .with('share_user')
      .with('user')
      .firstOrFail();
    return post;
  }

  async me({ auth, params }) {
    const { user } = auth.current;
    const { id } = params;
    try {
      return await Post.query()
        .where('user_id', id)
        .with('files')
        .with('liked', (builder) => {
          builder.where('user_id', user.id);
        })
        .withCount('likes')
        .withCount('comments')
        .withCount('share')
        .with('share_post.post')
        .with('share_post.post.midias')
        .with('share_user')
        .with('user')
        .orderBy('id', 'desc')
        .limit(8)
        .fetch();
    } catch (error) {
      return { error: 'não foi possivel obter os dados' };
    }
  }

  async meMedias({ params }) {
    const { id } = params;
    try {
      return await Post.query()
        .where('user_id', id)
        .whereHas('files', (builder) => {
          builder.where('type', 'image');
        })
        .with('files')
        .orderBy('id', 'desc')
        .fetch();
    } catch (err) {
      return { error: 'não foi possivel obter os dados' };
    }
  }

  async store({ request, auth }) {
    const data = request.only(['text', 'key']);
    const post = await auth.user.posts().create(data);
    return post;
  }

  async update({ request, response, auth, params }) {
    const oldPost = await Post.findOrFail(params.id);
    if (auth.user.id !== oldPost.user_id) {
      return response.status(403).send({
        error: {
          message: 'Você não tem parmissão para alterar essa postagem',
        },
      });
    }
    //
    const data = request.only(['text']);
    const post = await auth.user.posts().where('id', params.id).update(data);
    if (!post) {
      return response
        .status(400)
        .send({ error: { message: 'Erro ao atualizar a postagem.' } });
    }
    const updatedPost = await Post.find(params.id);
    return updatedPost;
  }

  async destroy({ response, params, auth }) {
    const post = await auth.user.posts().where('id', params.id).first();
    if (!post) {
      return response.status(404).send();
    }
    await post.delete();
  }
}

module.exports = PostController;
