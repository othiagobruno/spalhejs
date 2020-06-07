'use strict';

const Post = use('App/Models/Post');
const User = use('App/Models/User');

class PostController {
	async index({ auth, request }) {
		const { page } = request.all();
		const user = auth.current.user;
		const follows = await user.following().ids();
		follows.push(user.id);
		const posts = await Post.query()
			.whereIn('user_id', follows)
			.withCount('likes')
			.with('midias')
			.with('liked', (builder) => builder.where('user_id', auth.user.id))
			.withCount('comments')
			.withCount('share')
			.with('share_post.post')
			.with('share_user')
			.with('user')
			.orderBy('id', 'desc')
			.paginate(page, 10);
		return posts;
	}

	async show({ params, auth }) {
		const user = auth.current.user;
		const post = await Post.query()
			.where('id', params.id)
			.withCount('likes')
			.with('liked', (builder) => {
				builder.where('user_id', user.id);
			})
			.withCount('comments')
			.with('share.user')
			.withCount('share')
			.with('user')
			.firstOrFail();

		return post;
	}

	async me({ auth, params }) {
		const user = auth.current.user;
		const id = params.id;
		try {
			return await Post.query()
				.where('user_id', id)
				.withCount('likes')
				.with('liked', (builder) => {
					builder.where('user_id', user.id);
				})
				.withCount('comments')
				.withCount('share')
				.with('user')
				.orderBy('id', 'desc')
				.fetch();
		} catch (error) {
			return { error: 'desculpes-nos' };
		}
	}

	async store({ request, auth }) {
		const data = request.only([ 'text', 'key' ]);
		const post = await auth.user.posts().create(data);
		return post;
	}

	async update({ request, response, auth, params }) {
		const oldPost = await Post.findOrFail(params.id);
		if (auth.user.id !== oldPost.user_id) {
			return response
				.status(403)
				.send({ error: { message: 'Você não tem parmissão para alterar essa postagem' } });
		}
		//
		const data = request.only([ 'text' ]);
		const post = await auth.user.posts().where('id', params.id).update(data);
		if (!post) {
			return response.status(400).send({ error: { message: 'Erro ao atualizar a postagem.' } });
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
