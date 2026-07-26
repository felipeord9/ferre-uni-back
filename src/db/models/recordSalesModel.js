const { Model, DataTypes, Sequelize } = require("sequelize");

const RECORD_SALES_TABLE = 'RecordSales'

const RecordSalesSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
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
}

class RecordSales extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECORD_SALES_TABLE,
      modelName: 'RecordSales',
      timestamps: false
    }
  }
}

module.exports = {
  RECORD_SALES_TABLE,
  RecordSalesSchema,
  RecordSales
}