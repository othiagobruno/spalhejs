const Route = use('Route');

Route.group(() => {
  Route.get('users', 'UserController.index');
  Route.get('users/:id', 'UserController.show');

  Route.put('users', 'UserController.update').validator('UserUpdate');

  Route.put('users/change/username', 'UserController.username').validator(
    'Username'
  );

  Route.get('unfollowusers', 'FollowController.usersToFollow');
  Route.post('follow/:id', 'FollowController.follow');
  Route.post('unfollow/:id', 'FollowController.unFollow');

  Route.get('users/:id/followers', 'FollowController.showFollowers');
  Route.get('users/:id/following', 'FollowController.showFollowing');
}).middleware(['auth']);
