const mysql = require('mysql')
const config = require('../config')
const path = require('path')
const fs = require('fs')


class TestAdmin {

    async addGood(req, res) {

        const {name, article, price, oldprice, description, shortdescription, characteristics, images, catid} = req.body

    
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

        await  connection.query(`INSERT INTO goods (name, article, price, oldprice, description, shortdescription, characteristics, images, catid) VALUES ('${name}', '${article}', '${price}', '${oldprice}', '${description}', '${shortdescription}', '${characteristics}', '${images}', '${catid}')`, (error, result)=>{
            if(error){
                console.log(error)
                res.json({'message': `Ошибка при добавлении товара `, "success": false})
            } else {
               console.log('Запись создана')
               res.json({'message': `Товар ${article} добавлен в базу данных!`, "success": true})
              
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

    //получение товаров для редактирования
    async getGoods(req, res) {
      let rawdata = await fs.readFileSync(path.resolve(__dirname, '../goods.json'));
        let data = JSON.parse(rawdata);

        res.json({"goods": data, "success": true})
    }

    async updateGoodJSON(req, res) {
      
        let data = JSON.stringify(req.body);
        fs.writeFileSync(path.resolve(__dirname, '../goods.json'), data);


        let rawdata = await fs.readFileSync(path.resolve(__dirname, '../goods.json'));
        let dat = JSON.parse(rawdata);

        res.json({"goods": dat, "success": true})
    }

    async getGoodsParse(req, res) {
        let rawdata = await fs.readFileSync(path.resolve(__dirname, '../newgoods.json'));
        let data = JSON.parse(rawdata);

        res.json({"goods": data, "success": true})
    }

}



module.exports = new TestAdmin();