const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const adminRouter = require('./routes/testAdmin.router')
const cartRouter = require('./routes/cart.router')
const GoodsController = require('./controllers/goods.controller')
const CartController = require('./controllers/cart.controller')
const insertDB = require('./controllers/insert')



// insertDB()


const PORT = 3003

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}...`)
})

app.use(cors())
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))
app.use(bodyParser.json({limit: '5mb'}))

// admin API

app.use('/admin', adminRouter)

// admin API

app.use('/info', cartRouter)

app.set('view engine', 'pug')

app.use(express.json())

app.use(express.static('public'))



app.get('/', GoodsController.getAllCategory)

app.get('/good', GoodsController.getOneGood)

app.get('/goods', GoodsController.getAllGoods)

app.get('/cart', CartController.getCart)


