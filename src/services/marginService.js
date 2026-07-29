const { models } = require('../libs/sequelize')

const find = () => {
  const margins = models.Margin.findAll()
  return margins
}

const create = async (body) =>{
  const newMargin = models.Margin.create(body)
  return newMargin
}

const findOne = async (id) => {
  const margin = await models.Margin.findByPk(id)

  if(!margin) throw boom.notFound('Margin no encontrado')

  return margin
}

const update = async (id, changes) => {
  const margin = await findOne(id)
  const updatedMargin = await margin.update(changes)

  return updatedMargin
}

const remove = async (id) => {
  const margin = await findOne(id)
  await margin.destroy(id)
  return id
}

module.exports = {
  find,
  findOne,
  create,
  update,
  remove,
}