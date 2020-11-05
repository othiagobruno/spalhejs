const { test, trait } = use('Test/Suite')('Update User');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

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
