const { Model, DataTypes, Sequelize } = require("sequelize");

const SALES_TABLE = 'sales'

const SalesSchema = {
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
  coDesc: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'co_description',
  },
  doc: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'num_document',
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  noVendedor: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'id_seller',
  },
  vendedor: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'seller',
  },
  proveedor: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'supplier',
  },
  linea: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'linea',
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'razon_social',
  },
  typeClient: {
    type: DataTypes.STRING,
    allowNull: false,
    field:'type_client'
  },
  sublinea: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: false
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'description_item'
  },
  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  valor: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  margen: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  idListPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_list_price'
  },
  descLp: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'description_list_price'
  }
}

class Sales extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SALES_TABLE,
      modelName: 'Sales',
      timestamps: false
    }
  }
}

module.exports = {
  SALES_TABLE,
  SalesSchema,
  Sales
}