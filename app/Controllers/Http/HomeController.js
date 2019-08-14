'use strict'

const Route = use('Route');
const User = use('App/Models/User')
const path = require('path');
const fs = require('fs-extra')


class HomeController {

  async index({
    view
  }) {

    var breadcrumb = [{
        name: 'Home',
        url: Route.url('/'),
        icon: 'fa-dashboard',
        class: ''
      },
      {
        name: 'Dashboard',
        url: 'javascript:void(0)',
        icon: '',
        class: 'active'

      }
    ];
    view.share({
      title: 'Dashboard',
      breadcrumb: breadcrumb
    });
    return view.render('dashboard.index');
  }

  async phonecode({
    route,
    request,
    response,
    session,
    view
  }) {
    response.header('Content-type', 'application/json')
    var filename = 'countryCodes.json';
    filename = path.join(path.resolve(path.dirname('')), 'storage/', filename);
    var packageObj = await fs.readJsonSync(filename)
    return response.status(200).json(packageObj);

  }

}

module.exports = HomeController
