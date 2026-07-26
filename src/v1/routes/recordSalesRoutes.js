const express = require('express')
const recordSalesController = require('../../controllers/recordSalesController')

const router = express.Router()

router
    .get('/', recordSalesController.findAllRecord)
    .get("/:id", recordSalesController.findOneRecord)
    .post('/',recordSalesController.createRecord)
    .patch('/:id', recordSalesController.updateRecord)
    .delete('/:id', recordSalesController.deleteRecord)

module.exports = router