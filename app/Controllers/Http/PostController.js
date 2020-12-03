/* eslint-disable no-return-await */
const Post = use('App/Models/Post');
const Notification = use('App/Models/Notification');
const Comment = use('App/Models/Comment');
const Like = use('App/Models/Like');
const Drive = use('Drive');
const PostFile = use('App/Models/PostFile');
const Share = use('App/Models/Share');

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
      .with('share_post.post.files')
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
      .with('share_post.post.files')
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
        .with('share_post.post.files')
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
          builder.whereNot('type', null);
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

    const data = request.only(['text']);
    const post = await auth.user.posts().where('id', params.id).update(data);
    if (!post) {
      return response.status(400).send({
        title: 'Parece que essa publicação não existe',
        message: 'A publicação não foi encontrada',
      });
    }
    const updatedPost = await Post.find(params.id);
    return updatedPost;
  }

  async destroy({ response, params, auth }) {
    const post = await auth.user
      .posts()
      .where('id', params.id)
      .with('files')
      .first();

    if (!post) {
      return response.status(404).send();
    }

    if (post.user_id !== auth.current.user.id) {
      return response.status(401).send({
        message: 'você não tem permissão para apagar',
      });
    }

    // deleta as imagens do s3
    let msg;
    if (post?.files) {
      const files = await PostFile.query().where('post_id', params.id).fetch();
      const file = files.toJSON();
      file.map(async (item) => await Drive.disk('s3').delete(item.file));
      msg = file;
    }

    // deleta o post, notificações, comentários e curtidas
    await Notification.query().where('post_id', params.id).delete();
    await Comment.query().where('post_id', params.id).delete();
    await Like.query().where('post_id', params.id).delete();
    await Share.query().where('post_id', params.id).delete();
    await Post.query().where('post_id', params.id).delete();

    await post.delete();
    return msg;
  }
}

module.exports = PostController;
