const express = require('express')
const UserRoutes = require('./userRoutes')
const AuthRoutes = require('./authRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)

}

module.exports = routerApi