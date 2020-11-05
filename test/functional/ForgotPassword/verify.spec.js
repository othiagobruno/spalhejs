const { test, trait } = use('Test/Suite')('Verify Forgot Password');
const Database = use('Database');
const Factory = use('Factory');
const { subHours } = require('date-fns');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('should return success message when sending token and valid emails', async ({
  assert,
  client,
}) => {
  const email = 'assiswesley549@gmail.com';
  const user = await Factory.model('App/Models/User').create({ email });

  const { token } = await Factory.model('App/Models/Token').create({
    user_id: user.id,
    type: 'forgot',
  });

  const response = await client
    .post('/verify-forgot-token')
    .send({
      token,
      email,
    })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.token_is_valid, true);
});

test('should return status 400 when sending expired token', async ({
  assert,
  client,
}) => {
  const email = 'assiswesley549@gmail.com';
  const user = await Factory.model('App/Models/User').create({ email });

  const userToken = await Factory.model('App/Models/Token').create({
    user_id: user.id,
    type: 'forgot',
  });

  await Database.from('tokens')
    .where('token', userToken.token)
    .update('created_at', subHours(new Date(), 3));

  await userToken.reload();

  const response = await client
    .post('/verify-forgot-token')
    .send({
      token: userToken.token,
      email,
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body.token_is_valid, false);
});

test('should return validation error when sending fake token', async ({
  assert,
  client,
}) => {
  const email = 'assiswesley549@gmail.com';
  await Factory.model('App/Models/User').create({ email });

  const response = await client
    .post('/verify-forgot-token')
    .accept('application/json')
    .send({
      token: '159723',
      email,
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].field, 'token');
  assert.equal(response.body[0].validation, 'exists');
});

test('should return validation error when sending a non-existent email', async ({
  assert,
  client,
}) => {
  const email = 'assiswesley549@gmail.com';
  const user = await Factory.model('App/Models/User').create({ email });

  const { token } = await Factory.model('App/Models/Token').create({
    user_id: user.id,
    type: 'forgot',
  });

  const response = await client
    .post('/verify-forgot-token')
    .accept('application/json')
    .send({
      token,
      email: 'emailfake@gmail.com',
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].field, 'email');
  assert.equal(response.body[0].validation, 'exists');
});
