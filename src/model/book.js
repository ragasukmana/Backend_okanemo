const connection = require('../config/mysql')

module.exports = {
    getBook:()=>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM books',(error, result)=>{
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}