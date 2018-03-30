'use strict'

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

const Hash = use('Hash')
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) => ({
  name: faker.username(),
  email: faker.internet.email(),
  password: await Hash.make('secret')
}))
