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

const findBudgetsByYear = async (req, res, next) => {
  try {
    const { params: { anio } } = req;
    const data = await BudgetService.findByYear(anio)
    
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

const createMultiple = async ( req , res , next ) => {
  try{
    const { body } = req
    console.log(body)
    for(let budget of body) {
      await BudgetService.create({
        co: budget.co,
        descripCo: budget.descripCo,
        codlinea: budget.codlinea,
        descripLinea: budget.descripLinea,
        idVendedor: budget.idVendedor,
        rzsVendedor: budget.rzsVendedor,
        mes: budget.mes,
        anio: budget.anio,
        monto: budget.monto === '' ? 0 : budget.monto
      })
    }
    res.status(201).json({
      message: 'Created'
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

const updateMultiple = async (req, res, next) => {
  try {
    const { body } = req
    console.log(body)
    for(let budget of body) {
      const look = await BudgetService.findMultiple(budget.anio.toString(), budget.mes, budget.co)
      await look.update({
        monto: budget.monto === '' ? 0 : budget.monto
      })
    }

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    console.log(error)
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
  findBudgetsByYear,
  createBudget,
  createMultiple,
  updateBudget,
  updateMultiple,
  deleteBudget,
}