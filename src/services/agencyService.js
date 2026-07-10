const { models } = require('../libs/sequelize')

const find = () => {
  const agencies = models.Agency.findAll({
    order: [["id", "ASC"]]
  })
  return agencies
}

module.exports = {
  find
}