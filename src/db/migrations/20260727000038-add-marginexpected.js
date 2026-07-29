"use strict";

const { MARGIN_TABLE, MarginSchema } = require('../models/marginModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(MARGIN_TABLE,MarginSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MARGIN_TABLE);

  },
};
