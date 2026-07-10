const { User, UserSchema } = require('./userModel')
const { Agency, AgencySchema } = require('./coModel')
const { Budget, BudgetSchema } = require('./budgetModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Agency.init(AgencySchema, Agency.config(sequelize))
  Budget.init(BudgetSchema, Budget.config(sequelize))

  User.associate(sequelize.models)
  Agency.associate(sequelize.models)
  Budget.associate(sequelize.models)

}

module.exports = setupModels