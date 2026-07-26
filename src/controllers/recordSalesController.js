const RecordSalesService = require('../services/recordSalesService')

const findAllRecord = async (req, res, next) => {
  try {
    const data = await RecordSalesService.find()
    
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const findOneRecord = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await RecordSalesService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
};

const createRecord = async ( req , res , next ) => {
  try{
    const { body } = req
    console.log(body)
    const data = await RecordSalesService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const updateRecord = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await RecordSalesService.update(id, body)

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteRecord = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await RecordSalesService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllRecord,
  findOneRecord,
  createRecord,
  updateRecord,
  deleteRecord,
}