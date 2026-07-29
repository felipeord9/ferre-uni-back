const express = require('express')
const MarginController = require('../../controllers/marginController')

const router = express.Router()

router
    .get('/', MarginController.findAllMargins)
    .get("/:id", MarginController.findOneMargin)
    .post('/',MarginController.createMargin)
    .post('/multiple',MarginController.createMultiple)
    .post('/replace',MarginController.replaceMargin)
    .patch('/', MarginController.updateMargin)
    .delete('/:id', MarginController.deleteMargin)

module.exports = router