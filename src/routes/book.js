const express = require('express')
const Route = express.Router()
const {
 getBook
} = require('../controller/book')

Route 
    .get('/', getBook)

module.exports = Route