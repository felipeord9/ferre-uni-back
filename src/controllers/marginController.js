const MarginService = require('../services/marginService')
const { models, Sequelize } = require('../libs/sequelize')
const sequelize = require('../libs/sequelize')

const findAllMargins = async (req, res, next) => {
  try {
    const data = await MarginService.find()
    
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const findOneMargin = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await MarginService.findOne(id);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
};

const createMargin = async ( req , res , next ) => {
  try{
    const { body } = req
    console.log(body)
    const data = await MarginService.create(body)

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
    for(let margin of body) {
      await MarginService.create({
        co: margin.co,
        budget: margin.budget,
        expectedMargin: margin.expectedMargin,
        mes: margin.mes,
        anio: margin.anio,
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

const replaceMargin = async (req, res, next) => {
  // 1. Iniciamos la transacción
  const transaction = await sequelize.transaction();

  try {
    const { body } = req;

    if (!Array.isArray(body) || body.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'No se enviaron datos válidos para procesar.' });
    }

    // 2. Eliminamos todos los registros de la tabla dentro de la transacción
    await models.Margin.destroy({
      truncate: true,
      cascade: false,
      restartIdentity: true,
      transaction
    });

    // 3. Mapeamos y preparamos los datos limpios para inserción masiva
    const formattedData = body.map(margin => ({
        co: margin.co,
        budget: margin.budget,
        expectedMargin: margin.expectedMargin,
        mes: margin.mes,
        anio: margin.anio,
    }));

    // 4. Inserción masiva en lote (Bulk Create) en una sola consulta
    await models.Margin.bulkCreate(formattedData, { transaction });

    // 5. ⚠️ CONFIRMAMOS LA TRANSACCIÓN (Sin esto, la BD deshace todos los cambios)
    await transaction.commit();

    return res.status(201).json({
      message: 'margen reemplazado exitosamente',
      count: formattedData.length
    });

  } catch (error) {
    // 6. Si ocurre cualquier error, revertimos el borrado y la inserción
    await transaction.rollback();
    console.error('Error en replaceMargin:', error.message);
    next(error);
  }
};

const updateMargin = async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const data = await MarginService.update(id, body)

    res.json(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteMargin = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await MarginService.remove(id)

    res.status(200).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllMargins,
  findOneMargin,
  createMargin,
  createMultiple,
  replaceMargin,
  updateMargin,
  deleteMargin,
}