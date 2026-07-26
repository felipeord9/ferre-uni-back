const express = require('express')
const UserRoutes = require('./userRoutes')
const AuthRoutes = require('./authRoutes')
const AgencyRoutes = require('./agencyRoutes')
const BudgetRoutes = require('./budgetRoutes')
const RecordBudgetRoutes = require('./recordBudgetRoutes')
const SalesRoutes = require('./salesRoutes')
const RecordSalesRoutes = require('./recordSalesRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/agencies', AgencyRoutes)
    router.use('/budget', BudgetRoutes)
    router.use('/record/budget', RecordBudgetRoutes)
    router.use('/sales', SalesRoutes)
    router.use('/record/sales', RecordSalesRoutes)

}

module.exports = routerApi