const express=require('express')
const productController=require('../Controllers/productController')
const userController=require('../Controllers/userController')
const wishlistController=require('../Controllers/wishController')
const cartController=require('../Controllers/cartController')
const jwtMiddileware=require('../Middileware/jwtMiddileware')

const router= new express.Router()

router.get('/all-products',productController.getAllProductController)
router.get('/get-product/:id',productController.getProductController)
router.post('/user-register',userController.userRegister)
router.post('/user-login',userController.userLogin)
router.post('/add-to-wish',jwtMiddileware,wishlistController.addToWishlist)
router.get('/get-wish',jwtMiddileware,wishlistController.getWishItem)
router.get('/home-wish',jwtMiddileware,wishlistController.getWishHome)
router.delete('/wish-item-delete/:id',jwtMiddileware,wishlistController.deleteWishItem)
router.post('/add-to-cart',jwtMiddileware,cartController.addToCart)
router.get('/get-cart',jwtMiddileware,cartController.getCartAll)
router.get('/home-cart',jwtMiddileware,cartController.getHomeCart)

module.exports=router