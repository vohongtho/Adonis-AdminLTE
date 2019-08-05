'use strict'

class Reset {

  get rules () {
    return {
      password: 'required'
    }
  }

  get messages () {
    return {
      'password.required': 'Enter your new account password'
    }
  }

}

module.exports = Reset
