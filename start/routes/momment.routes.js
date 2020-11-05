const Route = use('Route');

Route.group(() => {
  Route.resource('moments', 'MomentController').apiOnly();

  Route.post('moment/view/:id', 'MviewController.store');
  Route.get('moment/view/:id', 'MviewController.show');
  Route.get('moment/count/:id', 'MviewController.count');

  Route.post('moment/comment/:id', 'MomentCommentController.store').validator(
    'MomentCommentStore'
  );

  Route.get('moment/comment/:id', 'MomentCommentController.index');
  Route.delete('moment/comment/:id', 'MomentCommentController.delete');
  Route.resource('moment/like/:id', 'MomentLikeController')
    .validator(
      new Map([
        [['moment/like/:id.store'], ['MomentLike']],
        [['moment/like/:id.index'], ['MomentLike']],
      ])
    )
    .apiOnly();
}).middleware(['auth']);
