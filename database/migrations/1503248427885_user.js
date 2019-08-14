'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('uid').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('provider').notNullable()
      table.string('first_name',50)
      table.string('phone_code', 10)
      table.string('phone_number', 14)
      table.string('last_name',60)
      table.string('role')
      table.string('confirmation_token')
      table.string('reset_token')
      table.datetime('last_login')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
