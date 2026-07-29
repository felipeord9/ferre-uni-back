const { Model, DataTypes, Sequelize } = require("sequelize");

const MARGIN_TABLE = 'margin'

const MarginSchema = {
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
  budget: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expectedMargin: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'expected_margin',
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  anio: {
    type: DataTypes.STRING,
    allowNull: true
  },
}

class Margin extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MARGIN_TABLE,
      modelName: 'Margin',
      timestamps: false
    }
  }
}

module.exports = {
  MARGIN_TABLE,
  MarginSchema,
  Margin
}