const express = require('express')
const budgetController = require('../../controllers/budgetController')

const router = express.Router()

router
    .get('/', budgetController.findAllBudgets)
    .get("/:id", budgetController.findOneBudget)
    .get("/year/:anio", budgetController.findBudgetsByYear)
    .post('/',budgetController.createBudget)
    .post('/multiple',budgetController.createMultiple)
    .patch('/', budgetController.updateMultiple)
    .patch('/:id', budgetController.updateBudget)
    .delete('/:id', budgetController.deleteBudget)

module.exports = router