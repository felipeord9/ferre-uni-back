const { models } = require('../libs/sequelize')

const find = () => {
  const budgets = models.Budget.findAll()
  return budgets
}

const findByYear = (anio) => {
  const budgets = models.Budget.findAll({
    where: {
      anio
    }
  })
  return budgets
}

const findMultiple = (anio, mes, co) => {
  const budget = models.Budget.findOne({
    where: {
      anio: anio,
      mes: mes,
      co: co
    }
  })
  
  if(!budget) throw boom.notFound('Budget no encontrado')

  return budget
}

const create = async (body) =>{
  const newBudget = models.Budget.create(body)
  return newBudget
}

const findOne = async (id) => {
  const Budget = await models.Budget.findByPk(id)

  if(!Budget) throw boom.notFound('Budget no encontrado')

  return Budget
}

const update = async (id, changes) => {
  const Budget = await findOne(id)
  const updatedBudget = await Budget.update(changes)

  return updatedBudget
}

const remove = async (id) => {
  const Budget = await findOne(id)
  await Budget.destroy(id)
  return id
}

module.exports = {
  find,
  findOne,
  findByYear,
  findMultiple,
  create,
  update,
  remove,
}