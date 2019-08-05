'use strict'

const uuid = use('uuid/v1')
const { validate } = use('Validator')
const Hash = use('Hash')
const Mail = use('Mail')
const User = use('App/Models/User')
const Event = use('Event')

class AuthController {

  async signup({ request, response, session }) {

    const data = request.only(['first_name', 'last_name', 'email', 'password'])

    const user = await User.create(data)

    Event.fire('SIGNUP', user)

    session.flash({ flash_info: 'Your account has been created. Please check your email.' })
    return response.route('login')

  }

  async login({ request, session, response, auth }) {

    const data = request.only(['email', 'password'])

    const user = await User.findBy('email', data.email)
    if (!user) {
      session.flash({ flash_error: 'There\'s no account for the provided e-mail.' })
      return response.redirect('back')
    }

    if (user.confirmation_token) {
      session.flash({ flash_error: 'Please verify your account first.' })
      return response.redirect('back')
    }

    const math_password = await Hash.verify(data.password, user.password)

    if (!math_password) {
      session.flash({ flash_error: 'Password provided is incorrect. Please try again.' })
      return response.redirect('back')
    }

    try {
      await auth.login(user)
      return response.route('root')
    } catch (e) {
      session.flash({ flash_error: e.message })
      return response.redirect('back')
    }
  }

  async confirm({ response, session, params }) {
    const token = params.token
    const user = await User.findBy('confirmation_token', token)

    if (!token.length) {
      return response.redirect('root')
    }

    if (user) {
      user.confirmation_token = null
      await user.save()
      session.flash({ flash_info: 'Account verified. You can now log in.' })
    }

    return response.route('root')
  }

  /**
   * resend confirmation token
   */
  async resend({ request, response, session }) {

    const data = request.only(['email'])

    const user = await User.findBy('email', data.email)
    if (!user) {
      session.flash({ flash_info: 'If the email you entered was right, in a minute you will receive the link to confirm your account.' })
      return response.redirect('login')
    }

    if (!user.confirmation_token) {
      session.flash({ flash_info: 'Your account is already verified.' })
      return response.route('root')
    }

    Event.fire('RESEND_CONFIRMATION', user)

    session.flash({ flash_info: 'If the email you entered was right, in a minute you will receive the link to confirm your account.' })
    return response.route('login')

  }

  /**
   * forgot password
   */
  async forgot({ request, response, session }) {

    const data = request.only(['email'])

    const user = await User.findBy('email', data.email)
    if (!user) {
      session.flash({ flash_info: 'If the email you entered was right, in a minute you will receive the link to reset the password.' })
      return response.redirect('back')
    }

    user.reset_token = uuid()
    await user.save()

    Event.fire('FORGOT_PASSWORD', user)

    session.flash({ flash_info: 'If the email you entered was right, in a minute you will receive the link to reset the password.' })
    return response.route('root')
  }

  async reset_view({ response, params, view }) {
    const token = params.token

    if (!token.length) {
      return response.route('root')
    }

    const user = await User.findBy('reset_token', token)
    if (!user) {
      return response.route('root')
    }
    return view.render('auth.reset', { token: token })

  }

  /**
   * Reset password
   */
  async reset({ request, response, session }) {

    const data = request.only(['token', 'password'])

    const user = await User.findBy('reset_token', data.token)
    if (!user) {
      return response.route('root')
    }

    user.password = await Hash.make(data.password)
    user.reset_token = null
    await user.save()

    session.flash({ flash_info: 'Password has been changed.' })
    return response.route('root')

  }

  /**
   * Logout
   */
  async logout({ response, session, auth }) {

    session.flash({ flash_info: 'Logged out successfully' })
    await auth.logout()
    return response.route('root')

  }

}

module.exports = AuthController
