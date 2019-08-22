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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.get('/', 'HomeController.index').as('root');
}).middleware('auth');

Route.group(() => {
  Route.get('/phonecode', 'HomeController.phonecode').as('phonecode');
}).prefix('api').middleware('auth');


Route.on('/forgot').render('auth.forgot').as('forgot');
Route.on('/login').render('auth.login').as('login');
Route.get('/logout', 'AuthController.logout').as('logout');
Route.get('/not_found', 'ErrorController.index').as('not_found');
Route.get('/reset/:token', 'AuthController.reset_view').as('reset')

Route.group(() => {
  Route.post('/signup', 'AuthController.signup').as('auth.signup').validator('auth/Signup');
  Route.post('/login', 'AuthController.login').as('auth.login').validator('auth/Login');
  Route.post('/resend', 'AuthController.resend').as('auth.resend').validator('auth/Resend');
  Route.post('/forforgotforgotgot', 'AuthController.forgot').as('auth.forgot');
  Route.post('/reset', 'AuthController.reset').as('auth.reset').validator('auth/Reset');
}).prefix('auth');


// User Controller

Route.group(() => {
  Route.get('/manage', 'User/UserController.manage').as('userManage');
  Route.get('/add', 'User/UserController.add').as('userAdd');
  Route.get('/edit/:id', 'User/UserController.edit').as('userEdit');
  Route.post('/edit/:id', 'User/UserController.edit').as('userEdit').validator('User/Edit');
}).prefix('user').middleware('auth');
