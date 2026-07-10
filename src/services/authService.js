const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserService = require('./userService')
const { config } = require('../config/config')

const getUser = async (email, password) => {
  const user = await UserService.findByUsername(email)

  if(user.status !== 'activo') throw boom.unauthorized()

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw boom.unauthorized()

  delete user.dataValues.password
  return user
}

const signToken = (user) => {
  const payload = {
    sub: user.id,
    role: user.role
  }
  const token = jwt.sign(payload, config.jwtSecret)
  return {
    user, token
  }
}

const changePassword = async (id, currentPassword, newPassword) => {
  const user = await UserService.findOne(id)

  const isMatch = bcrypt.compareSync(currentPassword, user.password)

  if(!isMatch) throw boom.unauthorized()

  const hash = bcrypt.hashSync(newPassword, 10)

  const updatedUser = await user.update({ password: hash })
  delete updatedUser.dataValues.password
  return updatedUser
}

module.exports = {
  getUser,
  signToken,
  changePassword,
}