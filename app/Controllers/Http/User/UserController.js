'use strict'
let BaseController = require("../BaseController");

const Route = use('Route');
const Logger = use('Logger');

const User = use('App/Models/User');
const {
  validate
} = use('Validator');
class UserController extends BaseController {
  async manage({
    route,
    request,
    response,
    session,
    view
  }) {
    let breadcrumb = [{
        name: 'Home',
        url: Route.url('/'),
        icon: 'fa-dashboard',
        class: '',
        content: ''
      },
      {
        name: 'Users',
        url: 'javascript:void(0)',
        icon: '',
        class: 'active',
        content: '<span>dffd</span>'
      }
    ];
    //url: Route.url('User/UserController.manage'),
    view.share({
      title: 'Users',
      breadcrumb: breadcrumb

    });
    let users = await User.all();
    return view.render('User.index', {
      users: users.rows
    });
  }
  async add({
    route,
    request,
    response,
    session,
    view
  }) {

    var breadcrumb = [{
        name: 'Home',
        url: Route.url('/'),
        icon: 'fa-dashboard',
        class: '',
      },
      {
        name: 'Users',
        url: Route.url('User/UserController.manage'),
        icon: '',
        class: '',
      }
    ];
    view.share({
      title: 'Add User',
      breadcrumb: breadcrumb
    });
    var phoneCode = await this.phoneCode();
    return view.render('User.add', {
      phoneCode: phoneCode
    });
  }
  async edit({
    route,
    request,
    response,
    session,
    view
  }) {
    var breadcrumb = [{
        name: 'Home',
        url: Route.url('/'),
        icon: 'fa-dashboard',
        class: '',
      },
      {
        name: 'Users',
        url: Route.url('User/UserController.manage'),
        icon: '',
        class: '',
      }
    ];
    view.share({
      title: 'Edit User',
      breadcrumb: breadcrumb
    });
    var params = request.params;
    if (!params || !params.id) {
      response.redirect('not_found');
    }
    let user = await this._validateData(params.id);
    if (request.method() == 'POST') {
      const data = request.only(['lastName', 'phoneCode', 'phoneNumber']);
      user.last_name = data.lastName;
      user.phone_code = data.phoneCode;
      user.phone_number = data.phoneNumber;
      try {
        await user.save();
      } catch (ex) {
        Logger.error(ex.message);

      }
      // await user.save();
      // const rules = {
      //   lastName: 'required',
      //   phoneCode: 'required',
      //   phoneNumber: 'required'
      // };
      // const validation = await validate(data, rules);
      // if (validation.fails()) {
      //   session
      //     .withErrors(validation.messages())
      //     .flashExcept(['password'])

      //   return response.redirect('back')
      // }

    }
    let phoneCode = await this.phoneCode();
    return view.render('User.edit', {
      phoneCode,
      user
    });
  }
  async _validateData(id) {
    if (!id) {
      throw new Error('Invalid User ID');
    }
    let user = await User.query().where('id', '=', id).first();
    // return user;

    if (!user || !user.id) {
      throw new Error('User does not exit');

    }
    return user;
  }

}

module.exports = UserController
