'use strict'

class UserEdit {
  get rules() {
    return {
      lastName: 'required',
      phoneCode: 'required',
      phoneNumber: 'required'
    }
  }
  get messages() {
    return {
      'lastName.required': 'You must provide your name.',
      'phoneCode.required': 'You must input phone code.',
      'phoneNumber.required': 'You must input phone number.',

    }
  }
}

module.exports = UserEdit
