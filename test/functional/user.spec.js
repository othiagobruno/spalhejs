const { test, trait } = use('Test/Suite')('User');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

// TEST STORE METHOD
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

// TEST INDEX METHOD
test('should return listing of all users when it is authenticated', async ({
  assert,
  client,
}) => {
  const users = await Factory.model('App/Models/User').createMany(5);
  const response = await client.get('users').loginVia(users[0]).end();

  response.assertStatus(200);
  assert.lengthOf(response.body, 5);
});

test('should return error when trying to list users without authentication', async ({
  client,
}) => {
  const response = await client.get('users').end();
  response.assertStatus(401);
});

// TEST SHOW METHOD
test('should return data from a specific user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').createMany(2);

  const response = await client
    .get(`users/${user[1].id}`)
    .loginVia(user[0])
    .end();

  response.assertStatus(200);
  assert.exists(response.body.id);
});

test('should return error when trying to find a user who does not exist', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const response = await client.get('users/10').loginVia(user).end();

  response.assertStatus(404);
  assert.equal(response.body.error, 'user not found');
});

// TEST UPDATE METHOD
test('should return updated user data when sent valid data', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: 'wesleyoliveira612',
  };
  const user = await Factory.model('App/Models/User').create(userData);

  userData.username = 'assis_wesley';

  const response = await client
    .put('users')
    .loginVia(user)
    .send(userData)
    .end();

  response.assertStatus(200);
  assert.equal(response.body.username, userData.username);
});

test('should return error when trying to update data with an invalid name', async ({
  assert,
  client,
}) => {
  const userData = {
    name: 'Wesley Oliveira',
    username: 'wesleyoliveira612',
  };
  const user = await Factory.model('App/Models/User').create(userData);

  userData.name = 'Wesley23_';

  const response = await client
    .put('users')
    .accept('application/json')
    .loginVia(user)
    .send(userData)
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'name',
    validation: 'regex',
  });
});

test('should return error when trying to update existing username on another account', async ({
  assert,
  client,
}) => {
  const username = 'wesleyoliveira612';
  await Factory.model('App/Models/User').create({ username });
  const userTestUpdate = await Factory.model('App/Models/User').create();

  const response = await client
    .put('users')
    .loginVia(userTestUpdate)
    .send({
      name: 'Wesley Oliveira',
      username,
    })
    .end();

  response.assertStatus(409);
  assert.exists(response.body.error);
});
