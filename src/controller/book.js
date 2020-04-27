const {
    getBook
} = require('../model/book')
const helper = require('../helper')

module.exports = {
    getBook: async(req, res)=>{
        const result = await getBook()
        return helper.response(res, 200, result)
    }
}