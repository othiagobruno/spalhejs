const Route = use('Route');

Route.group(() => {
  Route.get('posts', 'PostController.index');
  Route.get('posts/:id', 'PostController.show');
  Route.put('posts/:id', 'PostController.update');
  Route.delete('posts/:id', 'PostController.destroy');
  Route.post('posts', 'PostController.store').middleware(['upload:posts']);

  Route.get('users/:id/posts', 'PostController.me');
  Route.get('users/:id/photos', 'PostController.meMedias');

  Route.post('like', 'LikeController.store');
  Route.get('likes/:id', 'LikeController.show');

  Route.resource('comments', 'CommentController').apiOnly();
  Route.post('comments/:id/like', 'CommentLikeController.store');

  Route.post('reply/:id', 'ReplyController.store');
  Route.get('reply/:id', 'ReplyController.show');

  Route.post('share/:id', 'ShareController.store');
  Route.get('share/:id', 'ShareController.show');
}).middleware(['auth']);
