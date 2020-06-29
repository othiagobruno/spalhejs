'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    name: faker.name(),
    username: faker.username(),
    email: faker.email(),
    password: faker.string(),
    avatar: faker.url(),
    ...data,
  };
});

Factory.blueprint('App/Models/Moment', (faker, i, data) => {
  return {
    midia: faker.url(),
    text: faker.sentence(),
    user_id: faker.integer({ min: 1, max: 300 }),
    ...data,
  };
});

Factory.blueprint('App/Models/MomentComment', (faker, i, data) => {
  return {
    moment_id: faker.integer({ min: 1, max: 300 }),
    user_id: faker.integer({ min: 1, max: 300 }),
    text: faker.sentence(),
    ...data,
  };
});

Factory.blueprint('App/Models/MomentLike', (faker, i, data) => {
  return {
    moment_id: faker.integer({ min: 1, max: 300 }),
    user_id: faker.integer({ min: 1, max: 300 }),
    ...data,
  };
});

Factory.blueprint('App/Models/Token', (faker, i, data) => {
  return {
    user_id: data.user_id,
    type: data.type,
    token: faker.integer({ min: 100000, max: 999999 }),
    ...data,
  };
});
