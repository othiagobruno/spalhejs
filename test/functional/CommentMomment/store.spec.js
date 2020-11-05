const { test, trait } = use('Test/Suite')('Store Comment Moment');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return status 201 when creating a new comment', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.id,
    type: 'image',
  });

  const response = await client
    .post(`/moment/comment/${moment.id}`)
    .loginVia(user)
    .send({
      text: 'Lorem ipsum is simple dummy text',
    })
    .end();

  response.assertStatus(201);
});

test('should return a status of 400 when creating a comment without moment', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post(`/moment/comment/1`)
    .accept('application/json')
    .loginVia(user)
    .send({
      text: 'Lorem ipsum is simple dummy text',
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].validation, 'exists');
});

test('should return validation error when sending comment without text', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.id,
    type: 'image',
  });

  const response = await client
    .post(`/moment/comment/${moment.id}`)
    .loginVia(user)
    .accept('application/json')
    .send({
      text: '',
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].validation, 'required');
});
