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
  descripCo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'descrip_co',
  },
  codlinea: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cod_linea',
  },
  descripLinea: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'descrip_linea',
  },
  idVendedor: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'id_vendedor',
  },
  rzsVendedor: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'rzs_vendedor',
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monto: {
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