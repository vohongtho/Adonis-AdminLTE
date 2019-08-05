'use strict'

const Env = use('Env')
const Mail = use('Mail')
const Auth = exports = module.exports = {}

const app_from_title = Env.get('APP_FROM_TITLE')
const app_from_email = Env.get('APP_FROM_EMAIL')

Auth.signup = async (user) => {
    
    await Mail.send('emails.welcome', { token: user.confirmation_token }, (message) => {
        message.from(`${app_from_title} <${app_from_email}>`)
        message.subject('Welcome to Adonis Starter')
        message.to(user.email)
    }).catch(e => {
        console.log('Erro:<', e);
    })

}

Auth.confirm = async (user) => {

    await Mail.send('emails.confirm', { token: user.confirmation_token }, (message) => {
        message.from(`${app_from_title} <${app_from_email}>`)
        message.subject('Confirm new email')
        message.to(user.new_email)
    }).catch(e => {
        console.log('Erro:<', e);
    })

}

Auth.resend_confirmation = async (user) => {

    await Mail.send('emails.welcome', { token: user.confirmation_token }, (message) => {
        message.from(`${app_from_title} <${app_from_email}>`)
        message.subject('Verification email')
        message.to(user.email)
    }).catch(e => {
        console.log('Erro:<', e);
    })

}

Auth.forgot_password = async (user) => {

    await Mail.send('emails.forgot', { token: user.reset_token }, (message) => {
        message.from(`${app_from_title} <${app_from_email}>`)
        message.subject('Reset password')
        message.to(user.email)
    }).catch(e => {
        console.log('Erro:<', e);
    })

}
