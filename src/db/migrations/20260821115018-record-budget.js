"use strict";

const { RECORD_BUDGET_TABLE, RecordBudgetSchema } = require('../models/recordBudgetModel')
const { SALES_TABLE, SalesSchema } = require('../models/salesModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(RECORD_BUDGET_TABLE,RecordBudgetSchema);
    await queryInterface.createTable(SALES_TABLE,SalesSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(RECORD_BUDGET_TABLE);
    await queryInterface.dropTable(SALES_TABLE);

  },
};
