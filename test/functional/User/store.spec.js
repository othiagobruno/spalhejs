const { test, trait } = use('Test/Suite')('Store User');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should create a new user when sending valid data', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: 'wesleyoliveira612',
    email: 'assiswesley549@gmail.com',
  };

  const response = await client
    .post('/register')
    .send({ ...userData, password: 'Mypassword2' })
    .end();

  response.assertStatus(201);
  assert.include(response.body.user, userData);
  assert.exists(response.body.token);
});

test('should return validation error when trying to create the user with an existing email', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: 'wesleyoliveira612',
    email: 'assiswesley549@gmail.com',
  };

  await Factory.model('App/Models/User').create(userData);

  const response = await client
    .post('/register')
    .accept('application/json')
    .send({
      ...userData,
      username: 'wesley44',
      password: 'Mypassword2',
    })
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'email',
    validation: 'unique',
  });
});

test('should return validation error when trying to create the user with an existing username', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: 'wesleyoliveira612',
    email: 'assiswesley549@gmail.com',
  };

  await Factory.model('App/Models/User').create(userData);

  const response = await client
    .post('/register')
    .accept('application/json')
    .send({
      ...userData,
      email: 'outroemail@gmail.com',
      password: 'Mypassword2',
    })
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'username',
    validation: 'unique',
  });
});

test('should return validation error when trying to create a user with invalid name', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley23_',
    username: 'wesleyoliveira612',
    email: 'assiswesley549@gmail.com',
    password: 'MyPassword2',
  };

  const response = await client
    .post('/register')
    .accept('application/json')
    .send(userData)
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'name',
    validation: 'regex',
  });
});

test('should return validation error when trying to create a user with invalid email', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: 'wesleyoliveira612',
    email: 'assiswesley549.com',
    password: 'MyPassword2',
  };

  const response = await client
    .post('/register')
    .accept('application/json')
    .send(userData)
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'email',
    validation: 'email',
  });
});

test('should return validation error when trying to create a user with invalid password', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: 'wesleyoliveira612',
    email: 'assiswesley549@gmail.com',
    password: 'mypassword',
  };

  const response = await client
    .post('/register')
    .accept('application/json')
    .send(userData)
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'password',
    validation: 'regex',
  });
});

test('should return validation error when trying to create a user with invalid username', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: '.wesley oliveira',
    email: 'assiswesley549@gmail.com',
    password: 'MyPassword2',
  };

  const response = await client
    .post('/register')
    .accept('application/json')
    .send(userData)
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'username',
    validation: 'regex',
  });
});
