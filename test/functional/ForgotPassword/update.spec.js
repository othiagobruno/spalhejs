const { test, trait } = use('Test/Suite')('Update Forgot Password');
const Database = use('Database');
const Factory = use('Factory');
const Hash = use('Hash');
const { subHours } = require('date-fns');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test(`must change user's password when token is valid`, async ({
  assert,
  client,
}) => {
  const email = 'assiswesley549@gmail.com';
  const password = 'MyPassword2';

  const user = await Factory.model('App/Models/User').create({ email });

  const { token } = await Factory.model('App/Models/Token').create({
    user_id: user.id,
    type: 'forgot',
  });

  const response = await client
    .put('/reset-password')
    .send({ email, token, password })
    .end();

  await user.reload();

  const checkPasword = await Hash.verify(password, user.password);

  const checkTokenInDatabse = await Database.from('tokens')
    .where({ type: 'forgot' })
    .where({ token });

  response.assertStatus(200);
  assert.isTrue(checkPasword);
  assert.isEmpty(checkTokenInDatabse);
});

test('should return status 400 when trying to exchange password with expired token', async ({
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
    .put('/reset-password')
    .send({
      token: userToken.token,
      email,
      password: 'MyPassword2',
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body.token_is_valid, false);
});

test('should return status 400 when trying to exchange password with fake token', async ({
  assert,
  client,
}) => {
  const email = 'assiswesley549@gmail.com';
  await Factory.model('App/Models/User').create({ email });

  const response = await client
    .put('/reset-password')
    .accept('application/json')
    .send({
      token: '159723',
      email,
      password: 'MyPassword2',
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].field, 'token');
  assert.equal(response.body[0].validation, 'exists');
});

test('should return validation error when sending an invalid password', async ({
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
    .put('/reset-password')
    .accept('application/json')
    .send({
      token,
      email,
      password: 'mypassword',
    })
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].field, 'password');
  assert.equal(response.body[0].validation, 'regex');
});
