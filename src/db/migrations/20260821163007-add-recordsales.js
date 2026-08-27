'use strict';
const { RECORD_SALES_TABLE, RecordSalesSchema } = require('../models/recordSalesModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(RECORD_SALES_TABLE,RecordSalesSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(RECORD_SALES_TABLE);
  }
};

