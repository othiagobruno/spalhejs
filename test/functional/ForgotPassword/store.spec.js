const { test, trait } = use('Test/Suite')('Store Forgot Password');
const Database = use('Database');
const Factory = use('Factory');
const Mail = use('Mail');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('must send email with access token to change password', async ({
  assert,
  client,
}) => {
  Mail.fake();
  const email = 'assiswesley549@gmail.com';
  await Factory.model('App/Models/User').create({ email });

  const response = await client.post('/forgot-password').send({ email }).end();
  const recentEmail = Mail.pullRecent();

  const token = await Database.from('tokens').where({ type: 'forgot' });

  response.assertStatus(201);
  assert.equal(recentEmail.message.to[0].address, email);
  assert.exists(token[0].token);

  Mail.restore();
});

test('should return validation error when attempting to send a non-existent email', async ({
  assert,
  client,
}) => {
  const email = 'assiswesley549@gmail.com';
  const response = await client
    .post('/forgot-password')
    .accept('application/json')
    .send({ email })
    .end();

  response.assertStatus(400);
  assert.equal(response.body[0].field, 'email');
  assert.equal(response.body[0].validation, 'exists');
});
