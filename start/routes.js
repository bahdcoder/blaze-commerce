'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

/*
|--------------------------------------------------------------------------
| Stores
|--------------------------------------------------------------------------
|
| Resource route for managing the /stores endpoint
|
*/
Route.resource('stores', 'StoreController')
  .apiOnly()
  .middleware('auth')

/*
|--------------------------------------------------------------------------
| Products
|--------------------------------------------------------------------------
|
| Resource route for managing the /products endpoint
|
*/
Route.resource('products', 'ProductController')
  .apiOnly()
  .middleware('auth')
  .validator(new Map([
    [['store'], ['CreateProduct']]
  ]))

/*
|--------------------------------------------------------------------------
| Store products
|--------------------------------------------------------------------------
|
| Store a new product based on the store id
|
*/
Route.post('/stores/:storeId/products', 'ProductController.storeByStoreId')
  .middleware('auth')
  .validator('CreateProduct')
/*
|--------------------------------------------------------------------------
| Auth/Register
|--------------------------------------------------------------------------
|
| Auth route for new user registration
|
*/
Route.post('/users/register', 'AuthController.registerUser')
  .validator('RegisterUser')

/*
|--------------------------------------------------------------------------
| Auth/Login
|--------------------------------------------------------------------------
|
| Auth route for user personal access token generation
|
*/
Route.post('/users/login', 'AuthController.loginUser')
  .validator('LoginUser')
