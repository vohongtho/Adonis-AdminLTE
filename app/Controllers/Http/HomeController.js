'use strict'

class HomeController {

    async index({view}){
        return view.render('dashboard.index')
    }
}

module.exports = HomeController
