const Router = require('express')
const router = Router()
const CartController = require('../controllers/cart.controller')

router.post('/cart', CartController.getCartInfo)





module.exports = router