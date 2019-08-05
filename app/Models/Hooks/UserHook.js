'use strict'

const uuid = use('uuid/v1')
const Hash = use('Hash')
const User = use('App/Models/User')

const UserHook = module.exports = {}

UserHook.hashPassword = async (userInstance) => {
  if (userInstance.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}

UserHook.setDefaults = async (userInstance) => {
  userInstance.uid = Math.random().toString(18).substr(2, 8)
  userInstance.role = ( User.admins.includes(userInstance.email) ? 'admin' : 'subscriber' )
  userInstance.provider = userInstance.provider || 'local'
  userInstance.confirmation_token = (userInstance.provider === 'local' ? uuid() : null)
}
