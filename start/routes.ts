/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

Route.group(() => {
  Route.get('/article/new', 'BlogsController.create').as('posts.create')
  Route.post('/article/new', 'BlogsController.store')
  Route.get('/article/:id', 'BlogsController.show').as('posts.show')
  Route.post('/article/:id', 'BlogsController.update')
  Route.delete('/article/:id', 'BlogsController.destroy')
}).middleware('auth')

Route.get('/', 'BlogsController.index').as('home')
Route.get('/login', 'SecurityController.login').as('login')
Route.post('/login', 'SecurityController.doLogin')
