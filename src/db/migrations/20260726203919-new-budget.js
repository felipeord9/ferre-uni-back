"use strict";

const { BUDGET_TABLE, BudgetSchema } = require('../models/budgetModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(BUDGET_TABLE,BudgetSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(BUDGET_TABLE);

  },
};
