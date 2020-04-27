const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'library'
})

connection.connect((error)=>{
    if(error) throw error
    console.log('You are connect..')
})

module.exports = connection