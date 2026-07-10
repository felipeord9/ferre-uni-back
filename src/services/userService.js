const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const find = async () => {
  const users = await models.User.findAll({
    attributes: {
      exclude: 'password'
    } 
    /* where: {
      role: {
        [Op.lt]: 'admin'
      }
    },
    attributes: {
      exclude: 'password'
    } */
  })
  return users
}

const findOne = async (id) => {
  const user = await models.User.findByPk(id)

  if(!user) throw boom.notFound('Usuario no encontrado')

  return user
}

const findByEmail = async (email) => {
  const user = await models.User.findOne({
    where: { email }
  })

  if(!user) throw boom.notFound('Usuario no encontrado')

  return user
}

const findByUsername = async (username) => {
  const user = await models.User.findOne({
    where: {
      username: username
    }
  })

  if(!user) throw boom.notFound('Usuario no encontrado')

  return user
}

const create = async (data) => {
  const hash = bcrypt.hashSync(data.password, 10)
  const newUser = await models.User.create({
    ...data,
    password: hash,
  })
  delete newUser.dataValues.password
  return newUser
}

const update = async (id, changes) => {
  const user = await findOne(id)
  let info;
  console.log(changes)
  if(changes.password){
    if(changes.password.length >= 4){
      const hash = bcrypt.hashSync(changes.password, 10)
      info = {
        ...changes,
        password: hash,
      }
    }else{
      throw boom.notFound('contraseña insegura')
    }
  }else{
    info = {
      rowId: changes.rowId,
      username: changes.username,
      name: changes.name,
      role: changes.role,
      permissions: changes.permissions,
      status: changes.status,
      co: changes.co,
    }
  }

  const updatedUser = await user.update(changes)

  return updatedUser
}

const remove = async (id) => {
  const user = await findOne(id)
  await user.destroy(id)
  return id
}

const removeByUsername = async(username)=>{
  const user = await findByUsername(username)
  await user.destroy(username)
  return username
}

module.exports = {
  find,
  findOne,
  findByEmail,
  findByUsername,
  create,
  update,
  remove,
  removeByUsername,
}