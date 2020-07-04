'use strict';

const { test, trait } = use('Test/Suite')('Moments');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

//TEST METHOD STORE
test('should create a new moment and rettest should create a new moment and return the data', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/moments')
    .loginVia(user)
    .send({
      type: 'image',
      text: 'Lorem ipsum is a simple dummy text',
      user_id: user.id,
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});

//TEST INDEX METHOD
test('should return list of moments that the authenticated user follows', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').createMany(2);

  await Factory.model('App/Models/Follow').create({
    followid: user[0].id,
    user_id: user[1].id,
  });

  await Factory.model('App/Models/Moment').createMany(5, {
    user_id: user[1].id,
    type: 'image',
  });

  const response = await client.get('/moments').loginVia(user[0]).end();

  response.assertStatus(200);
  assert.exists(response.body[0].id);
  assert.exists(response.body[0].moments);
  assert.lengthOf(response.body[0].moments, 5);
});

test('should not retouch anything when trying to seek moments from people who do not exist', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').createMany(2);

  await Factory.model('App/Models/Moment').createMany(5, {
    user_id: user[1].id,
    type: 'image',
  });

  const response = await client.get('/moments').loginVia(user[0]).end();

  response.assertStatus(200);
  assert.isEmpty(response.body);
});
