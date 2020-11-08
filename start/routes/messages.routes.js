const Route = use('Route');

Route.post('chat', 'ChatController.store')
  .middleware(['auth'])
  .validator('Chat');

Route.get('chat', 'ChatController.index').middleware(['auth']);

Route.post('messages/:id', 'MessageController.store')
  .middleware(['auth'])
  .validator('Messages');

Route.get('messages/:id', 'MessageController.show').middleware(['auth']);
