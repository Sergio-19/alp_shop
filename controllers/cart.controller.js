const mysql = require('mysql')
const config = require('../config')



class CartController {
    // рендер шаблона страницы корзины
    async getCart(req, res) {
         res.render('cartPage.pug', {title: 'Корзина' })
    }

    //получение содержимого корзины API

    async getCartInfo(req, res) {
        const cart = req.body
        
        const connection =  await mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        })

        await connection.connect((error)=> {
        if(error){
            return console.log('Ошибка подключения к базе данных!')
        } else {
            return console.log('Подключение успешно')
        }
        })

        await connection.query(`SELECT * FROM goods WHERE article IN (${cart.join(',')})`, (error, result)=> {
            if(error) {
                console.log(error)
                res.json({"message": "Ошибка при запросе к базе данных", "success": false})
            } else {
                res.json({"cart": result, "success": true})
            }
        })

        await connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })
    }


}



module.exports = new CartController()