const Route = use('Route');

Route.post('/login', 'SessionController.store').validator('Login');
Route.post('/register', 'UserController.store').validator('UserStore');

Route.post('/forgot-password', 'ForgotController.store').validator(
  'ForgotStore'
);
Route.post('/verify-forgot-token', 'ResetPasswordController.verify').validator(
  'ResetPasswordVerify'
);
Route.put('/reset-password', 'ResetPasswordController.update').validator(
  'ResetPasswordUpdate'
);
