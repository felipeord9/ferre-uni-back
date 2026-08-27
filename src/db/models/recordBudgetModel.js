const { Model, DataTypes, Sequelize } = require("sequelize");

const RECORD_BUDGET_TABLE = 'recordBudget'

const RecordBudgetSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'upload_date',
  },
  uploadBy: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'upload_by'
  },
  rows: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}

class RecordBudget extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECORD_BUDGET_TABLE,
      modelName: 'RecordBudget',
      timestamps: false
    }
  }
}

module.exports = {
  RECORD_BUDGET_TABLE,
  RecordBudgetSchema,
  RecordBudget
}