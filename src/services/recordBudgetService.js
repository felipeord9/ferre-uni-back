const { models } = require('../libs/sequelize')

const find = () => {
  const records = models.RecordBudget.findAll({
    order: [["id", "DESC"]],
  })
  return records
}

const findOne = async (id) => {
  const record = await models.RecordBudget.findByPk(id)

  if(!record) throw boom.notFound('record no encontrado')

  return record
}

const create = async (body) =>{
  const newRecord = models.RecordBudget.create(body)
  return newRecord
}


const update = async (id, changes) => {
  const record = await findOne(id)
  const updatedRecord = await record.update(changes)

  return updatedRecord
}

const remove = async (id) => {
  const record = await findOne(id)
  await record.destroy(id)
  return id
}

module.exports = {
  find,
  findOne,
  create,
  update,
  remove,
}