const { test, trait } = use('Test/Suite')('Show User');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

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
