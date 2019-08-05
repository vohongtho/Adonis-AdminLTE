'use strict'

const Event = use('Event')

// AUTH events
Event.on('SIGNUP', 'Auth.signup')
Event.on('RESEND_CONFIRMATION', 'Auth.resend_confirmation')
Event.on('FORGOT_PASSWORD', 'Auth.forgot_password')
