const Route = use('Route');

Route.get('/', () => {
  return { welcome: 'Welcome to Spalhe API' };
});

require('./auth.routes');
require('./user.routes');
require('./post.routes');
require('./momment.routes');
require('./messages.routes');
require('./notification.routes');
require('./upload.routes');

Route.get('explore/images', 'ExploreController.index').middleware(['auth']);
Route.get('search/:id', 'SearchController.index').middleware(['auth']);

Route.get('files/:directory/:file', 'FileController.show');
Route.get('avatar/:id/:expiress', 'FileController.showAvatar');
