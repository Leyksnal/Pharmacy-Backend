const express = require('express')
const route = express.Router()
const { getUsers, getUser, logInUser, deleteUser } = require('../controller/userController')

route.route('/users').get(getUsers)
route.route('/login').post(logInUser)
route.route('/:id').get(getUser).delete(deleteUser)

module.exports = route