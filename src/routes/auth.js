const express = require('express')
const Route = express.Router()
const{
    getUser,
    createUser,
    loginUser,
    editUser,
    deleteUser
} = require('../controller/auth')

Route
    .get('/', getUser)
    .post('/registration', createUser)
    .post('/login', loginUser)
    .put('/edituser/:id_user', editUser)
    .delete('/:id_user', deleteUser)
module.exports = Route