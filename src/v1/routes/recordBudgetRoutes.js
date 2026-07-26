const express = require('express')
const recordBudgetController = require('../../controllers/recordBudgetController')

const router = express.Router()

router
    .get('/', recordBudgetController.findAllRecord)
    .get("/:id", recordBudgetController.findOneRecord)
    .post('/',recordBudgetController.createRecord)
    .patch('/:id', recordBudgetController.updateRecord)
    .delete('/:id', recordBudgetController.deleteRecord)

module.exports = router