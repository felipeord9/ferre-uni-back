const { Model, DataTypes, Sequelize } = require("sequelize");

const BUDGET_TABLE = 'budget'

const BudgetSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  co: {
    type: DataTypes.STRING(3),
    allowNull: false,
    validate: {
      is: /^\d{3}$/
    }
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  año: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}

class Budget extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BUDGET_TABLE,
      modelName: 'Budget',
      timestamps: false
    }
  }
}

module.exports = {
  BUDGET_TABLE,
  BudgetSchema,
  Budget
}