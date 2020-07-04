'use strict';

const Route = use('Route');

Route.get('/', () => {
  return { welcome: 'Welcome to Spalhe API' };
});

//REGISTER AND LOGIN
Route.post('login', 'SessionController.store');
Route.post('register', 'UserController.store').validator('UserStore');

//FORGOT PASSWORD
Route.post('/forgot-password', 'ForgotController.store').validator(
  'ForgotStore'
);
Route.post('/verify-forgot-token', 'ResetPasswordController.verify').validator(
  'ResetPasswordVerify'
);
Route.put('/reset-password', 'ResetPasswordController.update').validator(
  'ResetPasswordUpdate'
);

//USERS
Route.get('users', 'UserController.index').middleware(['auth']);
Route.get('users/:id', 'UserController.show').middleware(['auth']);
Route.put('users', 'UserController.update')
  .middleware(['auth'])
  .validator('UserUpdate');

///TOKEN GOOGLE MESSAGE NOTIFICATIONS
Route.put('gtoken', 'GtokenController.create').middleware(['auth']);

// Route.post('files/:id', 'FileController.store').middleware(['auth']);
Route.get('files/:dir/:path', 'FileController.show');
// Route.get('files', 'FileController.index').middleware(['auth']);

//POSTS
Route.resource('posts', 'PostController').apiOnly().middleware(['auth']);
Route.get('users/:id/posts', 'PostController.me').middleware(['auth']);

//LIKES POST
Route.post('like', 'LikeController.store').middleware(['auth']);
Route.get('likes/:id', 'LikeController.show').middleware(['auth']);

//COMMENTS
Route.resource('comments', 'CommentController').apiOnly().middleware(['auth']);
Route.get('comment/:id', 'CommentController.index').middleware(['auth']);
Route.post('comments/:id/like', 'CommentLikeController.store').middleware([
  'auth',
]);

//SHARE POST
Route.post('share/:id', 'ShareController.store').middleware(['auth']);
Route.get('share/:id', 'ShareController.show').middleware(['auth']);

//FOLLOWS
Route.get('unfollowusers', 'FollowController.usersToFollow').middleware([
  'auth',
]);
Route.post('follow/:id', 'FollowController.follow').middleware(['auth']);
Route.post('unfollow/:id', 'FollowController.unFollow').middleware(['auth']);

//GET USERS FOLLOWS
Route.get('users/:id/followers', 'FollowController.showFollowers').middleware([
  'auth',
]);
Route.get('users/:id/following', 'FollowController.showFollowing').middleware([
  'auth',
]);

//EXPLORE
Route.get('explore/images', 'ExploreController.index').middleware(['auth']);

//SEARCH
Route.get('search/:id', 'SearchController.index').middleware(['auth']);

//NOTIFICATIONS:
Route.resource('notifications', 'NotificationController')
  .apiOnly()
  .middleware(['auth']);

//MOMENTS
Route.resource('moments', 'MomentController')
  .middleware(['auth'])
  .validator(new Map([[['moments.store'], ['MomentStore']]]))
  .apiOnly();

Route.post('moment/view/:id', 'MviewController.store').middleware(['auth']);
Route.get('moment/view/:id', 'MviewController.show').middleware(['auth']);
Route.get('moment/count/:id', 'MviewController.count').middleware(['auth']);

Route.post('moment/comment/:id', 'MomentCommentController.store')
  .middleware(['auth'])
  .validator('MomentCommentStore');

Route.get('moment/comment/:id', 'MomentCommentController.index').middleware([
  'auth',
]);

Route.delete(
  'moment/comment/:id',
  'MomentCommentController.delete'
).middleware(['auth']);

Route.resource('moment/like/:id', 'MomentLikeController')
  .middleware(['auth'])
  .validator(
    new Map([
      [['moment/like/:id.store'], ['MomentLike']],
      [['moment/like/:id.index'], ['MomentLike']],
    ])
  )
  .apiOnly();

Route.post('moment/:id/file', 'MomentFileController.store')
  .middleware(['auth'])
  .validator('MomentFile')
  .middleware(['upload:moments']);

//REPLY COMMENTS
Route.post('reply/:id', 'ReplyController.store').middleware(['auth']);
Route.get('reply/:id', 'ReplyController.show').middleware(['auth']);

// MESSAGES ( vamos implementar o mongodb )
// Route.post('chat', 'ChatController.store').middleware([ 'auth' ]);
// Route.get('chat', 'ChatController.index').middleware([ 'auth' ]);
// Route.post('messages', 'MessageController.store').middleware([ 'auth' ]);
// Route.get('messages/:id', 'MessageController.show').middleware([ 'auth' ]);
// Route.put('messages/:id', 'MessageController.update').middleware([ 'auth' ]);
