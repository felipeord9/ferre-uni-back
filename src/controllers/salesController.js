const SalesService = require('../services/salesService')
const { models, Sequelize } = require('../libs/sequelize')
const sequelize = require('../libs/sequelize')

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

const parseToDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return null;

  // Separa "17/12/2025" -> [ "17", "12", "2025" ]
  const parts = dateStr.split('/'); 
  if (parts.length !== 3) return new Date(dateStr); // Fallback si viene en otro formato

  const [day, month, year] = parts;

  // Construye la fecha en formato ISO seguro YYYY-MM-DD (Meses en JS van de 0 a 11)
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day) + 1));
};

const createMultiple = async ( req , res , next ) => {
  try{
    const { body } = req
    for(let sale of body) {
      await SalesService.create({
        co: sale.co,
        coDesc: sale.coDesc,
        doc: sale.doc,
        date: parseToDate(sale.date),
        subtotal: sale.subtotal,
        noVendedor: sale.noVendedor,
        vendedor: sale.vendedor,
        proveedor: sale.proveedor,
        linea: sale.linea,
        cliente: sale.cliente,
        razonSocial: sale.razonSocial,
        typeClient: sale.typeClient,
        sublinea: sale.sublinea ? sale.sublinea : 'none',
        ref: sale.ref,
        item: sale.item,
        cantidad: sale.cantidad,
        valor: sale.valor,
        margen: sale.margen,
        idListPrice: sale.idListPrice,
        descLp: sale.descLp,
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

const replaceSales = async (req, res, next) => {
  // 1. Iniciamos la transacción
  const transaction = await sequelize.transaction();

  try {
    const { body } = req;

    if (!Array.isArray(body) || body.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'No se enviaron datos válidos para procesar.' });
    }

    // 2. Eliminamos todos los registros de la tabla dentro de la transacción
    await models.Sales.destroy({
      truncate: true,
      cascade: false,
      restartIdentity: true,
      transaction
    });

    // 3. Mapeamos y preparamos los datos limpios para inserción masiva
    const formattedData = body.map(sale => ({
      co: sale.co,
      coDesc: sale.coDesc,
      doc: sale.doc,
      date: parseToDate(sale.date),
      subtotal: sale.subtotal,
      noVendedor: sale.noVendedor,
      vendedor: sale.vendedor,
      proveedor: sale.proveedor,
      linea: sale.linea,
      cliente: sale.cliente,
      razonSocial: sale.razonSocial,
      typeClient: sale.typeClient,
      sublinea: sale.sublinea ? sale.sublinea : 'none',
      ref: sale.ref,
      item: sale.item,
      cantidad: sale.cantidad,
      valor: sale.valor,
      margen: sale.margen,
      idListPrice: sale.idListPrice,
      descLp: sale.descLp,
    }));

    // 4. Inserción masiva en lote (Bulk Create) en una sola consulta
    await models.Sales.bulkCreate(formattedData, { transaction });

    // 5. ⚠️ CONFIRMAMOS LA TRANSACCIÓN (Sin esto, la BD deshace todos los cambios)
    await transaction.commit();

    return res.status(201).json({
      message: 'Ventas reemplazadas exitosamente',
      count: formattedData.length
    });

  } catch (error) {
    // 6. Si ocurre cualquier error, revertimos el borrado y la inserción
    await transaction.rollback();
    console.error('Error en replaceSales:', error.message);
    next(error);
  }
};

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
  createMultiple,
  replaceSales,
  updateSale,
  deleteSale,
}