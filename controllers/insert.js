const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const config = require('../config')

async function insertDB() {

    let rawdata = fs.readFileSync(path.resolve(__dirname, '../goods.json'));
    let data = JSON.parse(rawdata);

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

   Object.keys(data).forEach(async (el, i)=> {
    await connection.query(`INSERT INTO goods (id, name, article, price, oldprice,	description, shortdescription, characteristics,	images,	catid) 
VALUES ('${i+32}', '${data[el].name}', '${data[el].article}', '${data[el].price}', '${data[el].oldprice}', '${data[el].description}', '${data[el].shortdescription}', '${data[el].characteristics}', '${data[el].images}', '${data[el].catid}')`, (error)=> {
if(error) { console.log(error)}
}) 
   })



   await connection.end((error)=> {
    if(error){
        console.log(`Ошибка ${error}`)
    } else {
        console.log('Подключение закрыто')
    }
})
   

}





module.exports = insertDB