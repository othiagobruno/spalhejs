'use strict';

const { test, trait } = use('Test/Suite')('Like Moment');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

//TEST STORE METHOD
test('should return status 201 when creating a new like', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.$attributes.id,
    type: 'image',
  });

  const response = await client
    .post(`/moment/like/${moment.$attributes.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(201);
});

test('should return validation error when trying to enjoy a non-existent moment', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post(`/moment/like/1`)
    .accept('application/json')
    .loginVia(user)
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].validation, 'exists');
});

test('should return status 401 when trying to like no moment without being authenticated', async ({
  client,
}) => {
  const response = await client.post(`/moment/like/1`).end();
  response.assertStatus(401);
});

test('should return status of 200 when giving dislike in a moment', async ({
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.$attributes.id,
    type: 'image',
  });

  await Factory.model('App/Models/MomentLike').create({
    user_id: user.$attributes.id,
    moment_id: moment.$attributes.id,
  });

  const response = await client
    .post(`/moment/like/${moment.$attributes.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

//TEST INDEX METHOD
test('should return list of likes of a moment', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const moment = await Factory.model('App/Models/Moment').create({
    user_id: user.$attributes.id,
    type: 'image',
  });

  await Factory.model('App/Models/MomentLike').create({
    user_id: user.$attributes.id,
    moment_id: moment.$attributes.id,
  });

  const response = await client
    .get(`/moment/like/${moment.$attributes.id}`)
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

test('should return error 401 when attempting to return listing without authentication', async ({
  client,
}) => {
  const response = await client.get(`/moment/like/1`).end();
  response.assertStatus(401);
});
