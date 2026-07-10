const express = require('express')
const budgetController = require('../../controllers/budgetController')

const router = express.Router()

router
    .get('/', budgetController.findAllBudgets)
    .get("/:id", budgetController.findOneBudget)
    .post('/',budgetController.createBudget)
    .patch('/:id', budgetController.updateBudget)
    .delete('/:id', budgetController.deleteBudget)

module.exports = router