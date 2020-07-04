'use strict';

const { test, trait } = use('Test/Suite')('Comment Moment');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

//TEST STORE METHOD
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
  assert.equal(response.body[0].validation, 'notExists');
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

//TEST INDEX METHOD
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

//TEST DELETE METHOD
test('should return comment count in a moment', async ({ assert, client }) => {
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
