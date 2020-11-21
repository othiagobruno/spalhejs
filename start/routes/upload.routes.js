const Route = use('Route');

Route.group(() => {
  Route.post('upload/posts/:id', 'FileController.posts').middleware([
    'upload:posts',
  ]);

  Route.post('upload/avatar', 'FileController.avatar').middleware([
    'upload:users',
  ]);

  Route.post('upload/moments', 'FileController.moment').middleware([
    'upload:moments',
  ]);

  Route.post('upload/messages/:id', 'FileController.message').middleware([
    'upload:messages',
  ]);
}).middleware(['auth']);
