'use strict'

class ErrorController {
  async index({
    request,
    session,
    response,
    auth,
    view
  }) {

    const user = await auth.getUser();
    if (!user) {
      return view.render('auth.404');

    } else {
      return view.render('dashboard.404');

    }
    console.log(auth.getUser());
  }
}

module.exports = ErrorController
