const express=require('express')
const productController=require('../Controllers/productController')
const userController=require('../Controllers/userController')
const wishlistController=require('../Controllers/wishController')
const cartController=require('../Controllers/cartController')
const jwtMiddileware=require('../Middileware/jwtMiddileware')
const adminController=require('../Controllers/adminController')

const router= new express.Router()

router.get('/all-products',productController.getAllProductController)
router.get('/limit-products',productController.getLimitProductController)
router.get('/get-product/:id',productController.getProductController)
router.post('/user-register',userController.userRegister)
router.post('/user-login',userController.userLogin)
router.post('/admin-login',userController.userLogin)
router.post('/add-to-wish',jwtMiddileware,wishlistController.addToWishlist)
router.get('/get-wish',jwtMiddileware,wishlistController.getWishItem)
router.get('/home-wish',jwtMiddileware,wishlistController.getWishHome)
router.delete('/wish-item-delete/:id',jwtMiddileware,wishlistController.deleteWishItem)
router.post('/add-to-cart',jwtMiddileware,cartController.addToCart)
router.get('/get-cart',jwtMiddileware,cartController.getCartAll)
router.get('/home-cart',jwtMiddileware,cartController.getHomeCart)
router.delete('/cart-item-delete/:id',jwtMiddileware,cartController.deleteCartItem)
router.get('/incre-item/:id',jwtMiddileware,cartController.incQuantity)
router.get('/decri-item/:id',jwtMiddileware,cartController.decQuantity)
// router.get('/decri-view-item/:id',jwtMiddileware,cartController.decViewQuantity)
router.delete('/clear-cart',jwtMiddileware,cartController.emptyCart)
router.delete('/clear-wish',jwtMiddileware,wishlistController.clearCollection)
router.get('/trending-product',productController.getTrendingProductController)
router.get('/recent-products',productController.getRecentProductsController)
router.get('/low-price-product',productController.getLowPriceProductsController)
router.get('/user-profile',jwtMiddileware,userController.geUserProfile)
router.put('/user-profile',jwtMiddileware,userController.updateUserProfile)
router.delete('/delete-account',jwtMiddileware,userController.deleteAccount)
router.get('/admin-profile',jwtMiddileware,adminController.getAdminProfile)
router.put('/admin-profile',jwtMiddileware,adminController.updateAdminProfile)
router.delete('/delete-admin-account',jwtMiddileware,adminController.deleteAdminAccount)
router.get('/all-users',adminController.getAllUsers)
router.post('/add-product',adminController.addProduct)
router.put('/admin-edit-product/:id',jwtMiddileware,adminController.getSpecificProduct)
router.delete('/product-delete/:id',jwtMiddileware,adminController.deleteProduct)
router.delete('/delete-user/:id',jwtMiddileware,adminController.deleteUserAccount)


module.exports=router