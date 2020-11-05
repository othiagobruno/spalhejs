const Route = use('Route');

Route.group(() => {
  Route.resource('notifications', 'NotificationController').apiOnly();

  Route.put('gtoken', 'GtokenController.create');
}).middleware(['auth']);
