const SalesService = require('../services/salesService')

const findAllSales = async (req, res, next) => {
  try {
    const data = await SalesService.find()
    
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const findOneSale = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await SalesService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
};

const createSale = async ( req , res , next ) => {
  try{
    const { body } = req
    console.log(body)
    const data = await SalesService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const updateSale = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await SalesService.update(id, body)

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteSale = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await SalesService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllSales,
  findOneSale,
  createSale,
  updateSale,
  deleteSale,
}