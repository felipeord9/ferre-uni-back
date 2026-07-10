const { Model, DataTypes, Sequelize } = require("sequelize");

const AGENCY_TABLE = 'agencies'

const AgencySchema = {
  id: {
    type: DataTypes.STRING(3),
    primaryKey: true,
    allowNull: false,
    validate: {
      is: /^\d{3}$/
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

class Agency extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AGENCY_TABLE,
      modelName: 'Agency',
      timestamps: false
    }
  }
}

module.exports = {
  AGENCY_TABLE,
  AgencySchema,
  Agency
}