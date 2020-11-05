const { test, trait } = use('Test/Suite')('Delete Comment Moment');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return comment count in a moment', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.id,
    type: 'image',
  });

  const comment = await Factory.model('App/Models/MomentComment').create({
    user_id: user.id,
    moment_id: moment.id,
  });

  const response = await client
    .delete(`/moment/comment/${comment.id}`)
    .loginVia(user)
    .send()
    .end();

  response.assertStatus(200);
});

test('should return error when trying to delete a comment that does not belong to the user', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const userTwo = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.id,
    type: 'image',
  });

  const comment = await Factory.model('App/Models/MomentComment').create({
    user_id: user.id,
    moment_id: moment.id,
  });

  const response = await client
    .delete(`/moment/comment/${comment.id}`)
    .loginVia(userTwo)
    .send()
    .end();

  response.assertStatus(403);
});
