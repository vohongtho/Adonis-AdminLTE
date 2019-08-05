'use strict'

class Login {

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email'
    }
  }

  get messages () {
    return {
      'email.required': 'Email is required to login',
      'email.email': 'Enter a valid email',
      'password.required': 'Enter your account password'
    }
  }

}

module.exports = Login
