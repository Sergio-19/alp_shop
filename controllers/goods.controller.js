const mysql = require('mysql')
const config = require('../config')


class GoodsController {

        //Получение одного товара по артикулу

        async getOneGood(req, res) {
            let goodArticle = req.query.id
            

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

            await connection.query(`SELECT * FROM goods WHERE article = '${goodArticle}'`, (error, result)=> {
                    if(error) {
                        console.log(error)
                    } else {
                        let charArr = []
                        let good = JSON.parse(JSON.stringify(result))
                        let charStr = good[0].characteristics.split('#')
                        charStr.forEach((char, i) => {
                            charArr.push({char: char.split('%')[0], value: char.split('%')[1]})
                        });
                      
                        res.render('goodPage.pug', {title: 'Спусковое устройство Petzl Rig' , good: good[0], characteristics: charArr})
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


        //Получение всех товаров в категории

        async getAllGoods(req, res) {

            let catId = req.query.id 

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

           await connection.query(`SELECT * FROM category WHERE catid = '${catId}'`, (error, result)=> {
                if(error){console.log(error)} else {
                    if(result.length > 0) {
                        catId = result[0].name
                    }
                }
           }) 

           await connection.query(`SELECT * FROM goods WHERE catid = '${catId}'`, (error, result)=> {
                if(error){
                    console.log(error)
                } else {
                    const goods = JSON.parse(JSON.stringify(result))

                    res.render('goodsPage.pug', {title: 'Страница поиска товаров', goods, catId })
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

         //Получение всех категорий (вывод категорий на главную страницу и в меню) этот метод нужно вызывать всегда для вывода списка категорий в меню

         async getAllCategory(req, res) {

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

            connection.query(`SELECT * FROM category`, (error, result)=> {
                if(error) {
                    console.log(`Ошибка запроса к базе данных ${error}`)
                    res.json({"message": `Ошибка запроса к базе данных ${error}`})
                } else {
                    const category = JSON.parse(JSON.stringify(result))
                    res.render('homePage.pug', {title: 'Магазин профессионального снаряжения', category})
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



module.exports = new GoodsController()