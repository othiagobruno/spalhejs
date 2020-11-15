const Route = use('Route');

Route.group(() => {
  Route.resource('posts', 'PostController').apiOnly();

  Route.get('users/:id/posts', 'PostController.me');
  Route.get('users/:id/photos', 'PostController.meMedias');

  Route.post('like', 'LikeController.store');
  Route.get('likes/:id', 'LikeController.show');

  Route.resource('comments', 'CommentController').apiOnly();
  Route.get('comment/:id', 'CommentController.index');
  Route.post('comments/:id/like', 'CommentLikeController.store');

  Route.post('reply/:id', 'ReplyController.store');
  Route.get('reply/:id', 'ReplyController.show');

  Route.post('share/:id', 'ShareController.store');
  Route.get('share/:id', 'ShareController.show');

  Route.post('posts/files/:id', 'FilePostController.store').middleware([
    'upload,all,7',
  ]);
}).middleware(['auth']);

Route.get('files/:id', 'FilePostController.show');
Route.get('files', 'FilePostController.index');
