'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('stores', 'StoreController')
  .apiOnly()
  .middleware('auth')

Route.post('/users/register', 'AuthController.registerUser')
  .validator('RegisterUser')

Route.post('/users/login', 'AuthController.loginUser')
  .validator('LoginUser')
