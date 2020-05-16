'use strict';

const Route = use('Route');

Route.get('/', () => {
	return { welcome: 'Welcome to Spalhe API' };
});

// LOGIN E CADASTRO
Route.post('login', 'SessionController.store');
Route.post('register', 'UserController.store');

// ROTAS PRIVADAS
// USERS
Route.get('users', 'UserController.index').middleware([ 'auth' ]);
Route.get('users/:id', 'UserController.show').middleware([ 'auth' ]);
Route.put('users/:id', 'UserController.update').middleware([ 'auth' ]);

// POSTS
Route.post('files', 'FileController.store').middleware([ 'auth' ]);
Route.resource('posts', 'PostController').middleware([ 'auth' ]);

// LIKES POST
Route.post('like/:id', 'LikeController.likePost').middleware([ 'auth' ]);
Route.delete('like/:id', 'LikeController.deslikePost').middleware([ 'auth' ]);

// COMMENTS
Route.resource('comments', 'CommentController').middleware([ 'auth' ]);

// SHARE POST
Route.post('share/:id', 'ShareController.store').middleware([ 'auth' ]);
Route.get('share/:id', 'ShareController.show').middleware([ 'auth' ]);

// FOLLOWS
Route.get('/unfollowusers', 'FollowController.usersToFollow').middleware([ 'auth' ]);
Route.post('/follow/:id', 'FollowController.follow').middleware([ 'auth' ]);
Route.post('/unfollow/:id', 'FollowController.unFollow').middleware([ 'auth' ]);

// EXPLORE
Route.get('explore', 'ExploreController.index').middleware([ 'auth' ]);
