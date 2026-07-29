const BudgetService = require('../services/budgetService')
const { models, Sequelize } = require('../libs/sequelize')
const sequelize = require('../libs/sequelize')

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

const replaceBudget = async (req, res, next) => {
  // 1. Iniciamos la transacción
  const transaction = await sequelize.transaction();

  try {
    const { body } = req;

    if (!Array.isArray(body) || body.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'No se enviaron datos válidos para procesar.' });
    }

    // 2. Eliminamos todos los registros de la tabla dentro de la transacción
    await models.Budget.destroy({
      truncate: true,
      cascade: false,
      restartIdentity: true,
      transaction
    });

    // 3. Mapeamos y preparamos los datos limpios para inserción masiva
    const formattedData = body.map(budget => ({
      co: budget.co,
      descripCo: budget.descripCo,
      codlinea: budget.codlinea,
      descripLinea: budget.descripLinea,
      idVendedor: budget.idVendedor,
      rzsVendedor: budget.rzsVendedor,
      mes: budget.mes,
      anio: String(budget.anio),
      monto: budget.monto === '' || budget.monto === undefined ? 0 : Number(budget.monto)
    }));

    // 4. Inserción masiva en lote (Bulk Create) en una sola consulta
    await models.Budget.bulkCreate(formattedData, { transaction });

    // 5. ⚠️ CONFIRMAMOS LA TRANSACCIÓN (Sin esto, la BD deshace todos los cambios)
    await transaction.commit();

    return res.status(201).json({
      message: 'Presupuesto reemplazado exitosamente',
      count: formattedData.length
    });

  } catch (error) {
    // 6. Si ocurre cualquier error, revertimos el borrado y la inserción
    await transaction.rollback();
    console.error('Error en replaceBudget:', error.message);
    next(error);
  }
};

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
  replaceBudget,
  updateBudget,
  updateMultiple,
  deleteBudget,
}