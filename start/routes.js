'use strict';

const Route = use('Route');

Route.get('/', () => {
	return { welcome: 'Welcome to Spalhe API' };
});

// LOGIN E CADASTRO
Route.post('login', 'SessionController.store');
Route.post('register', 'UserController.store');

// USERS
Route.get('users', 'UserController.index').middleware([ 'auth' ]);
Route.get('users/:id', 'UserController.show').middleware([ 'auth' ]);
Route.put('users/:id', 'UserController.update').middleware([ 'auth' ]);
/// TOKEN GOOGLE MESSAGE NOTIFICATIONS
Route.put('gtoken', 'GtokenController.create').middleware([ 'auth' ]);

// POSTS
Route.post('files/:id', 'FileController.store').middleware([ 'auth' ]);
Route.get('files', 'FileController.index').middleware([ 'auth' ]);
Route.resource('posts', 'PostController').apiOnly().middleware([ 'auth' ]);
Route.get('users/:id/posts', 'PostController.me').middleware([ 'auth' ]);

// LIKES POST
Route.post('like', 'LikeController.store').middleware([ 'auth' ]);
Route.get('likes/:id', 'LikeController.show').middleware([ 'auth' ]);

// COMMENTS
Route.resource('comments', 'CommentController').apiOnly().middleware([ 'auth' ]);
Route.get('comment/:id', 'CommentController.index').middleware([ 'auth' ]);
Route.post('comments/:id/like', 'CommentLikeController.store').middleware([ 'auth' ]);

// SHARE POST
Route.post('share/:id', 'ShareController.store').middleware([ 'auth' ]);
Route.get('share/:id', 'ShareController.show').middleware([ 'auth' ]);

// FOLLOWS
Route.get('unfollowusers', 'FollowController.usersToFollow').middleware([ 'auth' ]);
Route.post('follow/:id', 'FollowController.follow').middleware([ 'auth' ]);
Route.post('unfollow/:id', 'FollowController.unFollow').middleware([ 'auth' ]);

// GET USERS FOLLOWS
Route.get('users/:id/followers', 'FollowController.showFollowers').middleware([ 'auth' ]);
Route.get('users/:id/following', 'FollowController.showFollowing').middleware([ 'auth' ]);

// EXPLORE
Route.get('explore', 'ExploreController.index').middleware([ 'auth' ]);

// SEARCH
Route.get('search/:id', 'SearchController.index').middleware([ 'auth' ]);

// NOTIFICATIONS:
Route.resource('notifications', 'NotificationController').apiOnly().middleware([ 'auth' ]);

// MOMENTS
Route.resource('moments', 'MomentController').middleware([ 'auth' ]).apiOnly();
Route.post('moment/view/:id', 'MviewController.store').middleware([ 'auth' ]);
Route.get('moment/view/:id', 'MviewController.show').middleware([ 'auth' ]);
Route.get('moment/count/:id', 'MviewController.count').middleware([ 'auth' ]);

// REPLY COMMENTS
Route.post('reply/:id', 'ReplyController.store').middleware([ 'auth' ]);
Route.get('reply/:id', 'ReplyController.show').middleware([ 'auth' ]);

// MESSAGES ( vamos implementar o mongodb )
// Route.post('chat', 'ChatController.store').middleware([ 'auth' ]);
// Route.get('chat', 'ChatController.index').middleware([ 'auth' ]);
// Route.post('messages', 'MessageController.store').middleware([ 'auth' ]);
// Route.get('messages/:id', 'MessageController.show').middleware([ 'auth' ]);
// Route.put('messages/:id', 'MessageController.update').middleware([ 'auth' ]);
