const express = require('express')
const Route = express.Router()

const auth = require('./routes/auth')
const book = require('./routes/book')

Route
    .use('/user', auth)
    .use('/book', book)

module.exports = Route