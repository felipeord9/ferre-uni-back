const BudgetService = require('../services/budgetService')

const findAllBudgets = async (req, res, next) => {
  try {
    const data = await BudgetService.find()
    
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const findOneBudget = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await BudgetService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
};

const createBudget = async ( req , res , next ) => {
  try{
    const { body } = req
    console.log(body)
    const data = await BudgetService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

const updateBudget = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await BudgetService.update(id, body)

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteBudget = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await BudgetService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllBudgets,
  findOneBudget,
  createBudget,
  updateBudget,
  deleteBudget,
}