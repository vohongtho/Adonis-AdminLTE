'use strict'
const path = require('path');
const User = use('App/Models/User');
const fs = require('fs-extra');
class BaseController {
  constructor() {}
  phoneCode() {
    var filename = 'countryCodes.json';
    filename = path.join(path.resolve(path.dirname('')), 'storage/', filename);
    var packageObj = fs.readJsonSync(filename);
    return packageObj;
  }
}

module.exports = BaseController
