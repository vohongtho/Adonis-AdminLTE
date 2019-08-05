'use strict'

class Handler {

  async handle(error, { request, response, session, view }) {
    const isJSON = request.accepts(['html', 'json']) === 'json'

    // validation exception
    if (error.name === 'ValidationException') {
      session.withErrors(error.messages).flashAll()
      await session.commit()
      response.redirect('back')
      return
    }

    if (error.name === 'InvalidSessionException') {
      response.redirect('/login')
      return
    }

    if (error.name === 'InvalidLoginException' || error.name === 'InvalidSessionException') {
      response.redirect('/login')
      return
    }

    response.status(error.status).send(error.message)

  }

  async report(error, { request }) {
    console.log(error)
  }

}

module.exports = Handler
