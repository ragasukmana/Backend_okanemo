const connection = require('../config/mysql')
const bcrypt = require('bcryptjs')

module.exports = {
    getUser: () =>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM user', (error, result)=>{
                if (!error) {
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    createUser:(setData)=>{
        return new Promise((resolve, reject)=>{
            connection.query('INSERT INTO user SET ?', setData, (error, result)=>{
                if (!error) {
                    delete setData.password
                    const newResult = {
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    loginUser:(data)=>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM user WHERE username=?', data.username, (error, result)=>{
                const detailUser = {
                    ...result ? result[0] : null
                }
                if (result && result[0]) {
                    bcrypt.compare(data.password, result[0].password).then((result)=>{
                        if (result === true) {
                            delete detailUser.password
                            resolve(detailUser)
                        } else {
                            reject(new Error(error))
                        }
                    })
                }else{
                    reject(new Error(error))
                }
            })
        })
    },
    putUser:(setData, id_user)=>{
        return new Promise((resolve, reject)=>{
            connection.query('UPDATE user SET ? WHERE id_user=?',[setData, id_user], (error,result)=>{
                if (!error) {
                    delete setData.password
                    const newResult ={
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteUser:(id_user)=>{
        return new Promise((resolve, reject)=>{
            connection.query('DELETE FROM user WHERE id_user=?', id_user, (error, result)=>{
                if (!error) {
                    const newResult={
                        message: "User Deleted"
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}