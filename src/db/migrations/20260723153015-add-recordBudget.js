"use strict";

const { RECORD_BUDGET_TABLE, RecordBudgetSchema } = require('../models/recordBudgetModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(RECORD_BUDGET_TABLE,RecordBudgetSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(RECORD_BUDGET_TABLE);

  },
};
