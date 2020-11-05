const { test, trait } = use('Test/Suite')('Index User');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

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
