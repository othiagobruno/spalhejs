const { test, trait } = use('Test/Suite')('Index Comment Moment');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return comment listing', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.id,
    type: 'image',
  });

  Factory.model('App/Models/MomentComment').createMany(5, {
    user_id: user.id,
    moment_id: moment.id,
  });

  const response = await client
    .get(`/moment/comment/${moment.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.isArray(response.body);
  assert.lengthOf(response.body, 5);
  assert.property(response.body[0], 'user');
});
