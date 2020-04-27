const {
    getUser,
    createUser,
    loginUser,
    putUser,
    deleteUser
} = require('../model/auth')
const helper = require('../helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(6)

module.exports = {
    getUser: async(req, res)=>{
        const result = await getUser()
        return helper.response(res, 200, result)
    },
    createUser: async (req, res)=>{
        try {
            const setData = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, salt),
                name: req.body.name,
                role: req.body.role,
                status: req.body.status
            }
            const result = await createUser(setData)
            return helper.response(res, 200, result)
        } catch (error) {
            return helper.response(res, 400, error)
        }
    },
    loginUser: async (req, res)=>{
        try {
            const data = {
                username: req.body.username,
                password: req.body.password
            }
            const result = await loginUser(data)
            const token = jwt.sign({result}, 'password123', {algorithm:"HS256", expiresIn: '1h'})
            return helper.response(res, 200, {token, ...result})
        } catch (error) {
            console.log(error);
            
            return helper.response(res, 400, {error, message: "Password Invalid"})
        }
    },
    editUser: async (req, res)=>{
        try {
            const setData = {
                password: bcrypt.hashSync(req.body.password, salt),
                name: req.body.name,
                role: req.body.role,
                status: req.body.status
            }
            const id_user = req.params.id_user
            const result = await putUser(setData, id_user)
            return helper.response(res, 200, result)
        } catch (error) {
            return helper.response(res, 400, error)
        }
    },
    deleteUser: async(req, res)=>{
        try {
            const id_user = req.params.id_user
            const result = await deleteUser(id_user)
            return helper.response(res, 200, result)
        } catch (error) {
            return helper.response(res, 400, error)
        }
    }
}