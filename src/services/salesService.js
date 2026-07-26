const { models } = require('../libs/sequelize')

const find = () => {
  const sales = models.Sales.findAll()
  return sales
}

const findOne = async (id) => {
  const Sale = await models.Sales.findByPk(id)

  if(!Sale) throw boom.notFound('Sale no encontrado')

  return Sale
}

const create = async (body) =>{
  const newSale = models.Sales.create(body)
  return newSale
}


const update = async (id, changes) => {
  const Sale = await findOne(id)
  const updatedSale = await Sale.update(changes)

  return updatedSale
}

const remove = async (id) => {
  const Sale = await findOne(id)
  await Sale.destroy(id)
  return id
}

module.exports = {
  find,
  findOne,
  create,
  update,
  remove,
}