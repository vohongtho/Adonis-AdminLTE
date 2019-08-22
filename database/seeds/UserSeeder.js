'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
const Database = use('Database')
const uuid = use('uuid/v1')

class UserSeeder {
  async run () {
    const user = await Database.from('users').insert([
      {
        uid: uuid(),
        provider: 'local',
        first_name: 'Admin',
        last_name: 'admin',
        email: 'adminlte@yopmail.com',
        role: 'admin',
        confirmation_token: '',
        password: await Hash.make('123456')

      }
    ])

  }
}

module.exports = UserSeeder
