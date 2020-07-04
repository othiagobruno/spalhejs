'use strict';

const { test, trait, after } = use('Test/Suite')('File Moment');
const Helpers = use('Helpers');
const Factory = use('Factory');
const fs = require('fs');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

after(async () => {
  try {
    fs.rmdirSync(Helpers.tmpPath('moments'), { recursive: true });
  } catch (error) {
    console.log('error while deleting moments path');
  }
});

test('should successfully upload file', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create();
  const moment = await Factory.model('App/Models/Moment').create({
    type: 'image',
    user_id: user.id,
  });

  const response = await client
    .post(`/moment/${moment.id}/file`)
    .loginVia(user)
    .attach('files[]', Helpers.tmpPath('test/test-image.jpg'))
    .end();

  response.assertStatus(201);
});

test('should return error when trying to upload file without a moment', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/moment/1/file')
    .accept('application/json')
    .loginVia(user)
    .attach('files[]', Helpers.tmpPath('test/test-image.jpg'))
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'id',
    validation: 'notExists',
  });
});

test('should return error when trying to send a file to an already registered moment', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const moment = await Factory.model('App/Models/Moment').create({
    type: 'image',
    user_id: user.id,
  });

  await Factory.model('App/Models/MomentFile').create({
    moment_id: moment.id,
    type: 'image',
  });

  const response = await client
    .post(`/moment/${moment.id}/file`)
    .accept('application/json')
    .loginVia(user)
    .attach('files[]', Helpers.tmpPath('test/test-image.jpg'))
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'id',
    validation: 'exists',
  });
});

test('should return error when trying to upload an invalid file', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const moment = await Factory.model('App/Models/Moment').create({
    type: 'image',
    user_id: user.id,
  });

  const response = await client
    .post(`/moment/${moment.id}/file`)
    .loginVia(user)
    .attach('files[]', Helpers.tmpPath('test/test-script.js'))
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    fieldName: 'files[]',
    type: 'type',
  });
});

test('test should return error when trying to send request without a file', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const moment = await Factory.model('App/Models/Moment').create({
    type: 'image',
    user_id: user.id,
  });

  const response = await client
    .post(`/moment/${moment.id}/file`)
    .accept('application/json')
    .loginVia(user)
    .end();

  response.assertStatus(400);
  assert.include(response.body[0], {
    field: 'files',
    validation: 'required',
  });
});
