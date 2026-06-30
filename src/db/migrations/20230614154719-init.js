"use strict";

const { DRIVER_TABLE, DriverSchema } = require("../models/driverModel");
const { PLATE_TABLE, PlateSchema } = require("../models/plateModel");
const { USER_TABLE, UserSchema } = require('../models/userModel')
const { WASH_TABLE, WashSchema } = require('../models/washModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(DRIVER_TABLE, DriverSchema);
    await queryInterface.createTable(WASH_TABLE, WashSchema);
    await queryInterface.createTable(PLATE_TABLE, PlateSchema);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(DRIVER_TABLE);
    await queryInterface.dropTable(WASH_TABLE);
    await queryInterface.dropTable(PLATE_TABLE);

  },
};
