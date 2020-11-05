const { test, trait } = use('Test/Suite')('Index Like Moment');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return list of likes of a moment', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.id,
    type: 'image',
  });

  await Factory.model('App/Models/MomentLike').create({
    user_id: user.id,
    moment_id: moment.id,
  });

  const response = await client
    .get(`/moment/like/${moment.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.isArray(response.body);
  assert.property(response.body[0], 'user');
});

test('should return validation error when trying to list non-existent moment likes', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .get(`/moment/like/1`)
    .accept('application/json')
    .loginVia(user)
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].validation, 'exists');
});
