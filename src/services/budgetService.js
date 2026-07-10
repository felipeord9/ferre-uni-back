const { models } = require('../libs/sequelize')

const find = () => {
  const budgets = models.Budget.findAll()
  return budgets
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
  create,
  update,
  remove,
}