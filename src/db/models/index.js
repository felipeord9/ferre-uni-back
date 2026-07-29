const { User, UserSchema } = require('./userModel')
const { Agency, AgencySchema } = require('./coModel')
const { Budget, BudgetSchema } = require('./budgetModel')
const { RecordBudget, RecordBudgetSchema } = require('./recordBudgetModel')
const { Sales, SalesSchema } = require('./salesModel')
const { RecordSales, RecordSalesSchema } = require('./recordSalesModel')
const { Margin, MarginSchema } = require('./marginModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Agency.init(AgencySchema, Agency.config(sequelize))
  Budget.init(BudgetSchema, Budget.config(sequelize))
  RecordBudget.init(RecordBudgetSchema, RecordBudget.config(sequelize))
  Sales.init(SalesSchema, Sales.config(sequelize))
  RecordSales.init(RecordSalesSchema, RecordSales.config(sequelize))
  Margin.init(MarginSchema, Margin.config(sequelize))

  User.associate(sequelize.models)
  Agency.associate(sequelize.models)
  Budget.associate(sequelize.models)
  RecordBudget.associate(sequelize.models)
  Sales.associate(sequelize.models)
  RecordSales.associate(sequelize.models)
  Margin.associate(sequelize.models)

}

module.exports = setupModels