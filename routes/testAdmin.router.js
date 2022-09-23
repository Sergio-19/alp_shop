const Router = require('express')
const router = Router()
const adminController = require('../controllers/testAdmin.controller')


router.post('/addgood', adminController.addGood)
router.get('/allgoods', adminController.getGoods)
router.post('/update', adminController.updateGoodJSON)
router.get('/parse', adminController.getGoodsParse)

module.exports = router