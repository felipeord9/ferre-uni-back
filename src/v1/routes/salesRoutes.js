const express = require('express')
const salesController = require('../../controllers/salesController')

const router = express.Router()

router
    .get('/', salesController.findAllSales)
    .get("/:id", salesController.findOneSale)
    .post('/',salesController.createSale)
    .patch('/:id', salesController.updateSale)
    .delete('/:id', salesController.deleteSale)

module.exports = router