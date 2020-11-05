const { test, trait } = use('Test/Suite')('Session');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('should return jwt token and authenticated user information', async ({
  assert,
  client,
}) => {
  const userData = {
    email: 'assiswesley549@gmail.com',
    password: 'Mypassword2',
  };

  await Factory.model('App/Models/User').create(userData);
  const response = await client.post('/login').send(userData).end();

  response.assertStatus(200);
  assert.exists(response.body.token);
  assert.exists(response.body.user.id);
});

test('should return error when trying to log in with invalid password', async ({
  assert,
  client,
}) => {
  const userData = {
    email: 'assiswesley549@gmail.com',
    password: 'Mypassword2',
  };
  await Factory.model('App/Models/User').create(userData);

  userData.password = 'password2';

  const response = await client.post('/login').send(userData).end();

  response.assertStatus(401);
  assert.include(response.body[0], {
    field: 'password',
    message: 'Invalid user password',
  });
});

test('should return an error when trying to log in with a non-existent email', async ({
  assert,
  client,
}) => {
  const userData = {
    email: 'assiswesley549@gmail.com',
    password: 'Mypassword2',
  };

  const response = await client.post('/login').send(userData).end();

  response.assertStatus(401);
  assert.include(response.body[0], {
    field: 'email',
    message: 'Cannot find user with provided email',
  });
});
