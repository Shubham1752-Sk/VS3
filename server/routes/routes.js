const express=require("express");
const router=express.Router()

const {createCategory,
    ViewCategories,
    UpdateCateory,
    deleteCategory}
    =require("../controllers/Category")

const {
     createProduct
    ,ViewAllProducts,
    DeleteProduct,
    UpdateProduct,
    viewProductsById,
    fetchProductsByCategory,
    filterFunction}
      =require("../controllers/Products");

const {SendOtp,
    LogIn,
    SignIn,
    }
    =require("../controllers/Auth")

const {
    fetchAllCustomers,
    ChangeUserPassword,
    ViewAllOrders
    }=require("../controllers/Profile")

const{
    resetPasswordToken,
    resetPassword}
    =require("../controllers/ResetPassword")

const{
    CreateRating,
    getAverageRatings,
    getAllRatings,
    DeleteProductRating
    }=
    require("../controllers/RatingAndReview")

const {auth,isCustomer}=require("../middleware/auth")

const {stripe_payment, handleWebhook}=require("../controllers/Stripe")

const{
    CreateCart,  
    ViewCart,
    removeFromCartById,
    ResetCart,
    ViewAllCustomerorders,
    AllOrdersAmount,
    UpdateQuantity
}=require("../controllers/Order")

const {capturePayment1,createOrder1,generateClientToken}=require("../controllers/PayPal")

router.post("/start-stripe-payment",auth,isCustomer,stripe_payment)
      .post("/stripe/payments/webhook",handleWebhook)

router.get("/ViewCategories",ViewCategories)
      .post("/CreateCategory",createCategory)
      .post("/UpdateCategory/",UpdateCateory)
      .delete("/DeleteCategory/",deleteCategory)
      .post("/fetchProductsByCatgeory",fetchProductsByCategory)
      .post("/filterFunction",filterFunction)

router.post("/CreateProduct",createProduct)
      .get("/ViewAllProducts",ViewAllProducts)
      .get("/UpdateProducts/:id/",UpdateProduct)
      .get("/ViewSingleProduct/:id",viewProductsById)
      .delete("/DeleteProduct/",DeleteProduct)

router.post("/ChangeUserPassword",auth,isCustomer,ChangeUserPassword)
      .get("/ViewAllOrders",auth,isCustomer,ViewAllOrders)  

router.post("/sendotp",SendOtp)
      .post("/login",LogIn)
      .post("/signIn",SignIn)

router.get("/fetchAllCustomers",fetchAllCustomers);

router.post("/reset-password-token",resetPasswordToken)
      .post("/reset-password",resetPassword);

router.post("/CreateRating",auth,isCustomer,CreateRating)
      .get("/getAllRatings",getAllRatings)
      .delete("/DeleteProductRating",auth,isCustomer,DeleteProductRating)

router.get("/viewCart",auth,isCustomer,ViewCart)
      .delete("/DeleteFromCart",auth,isCustomer,removeFromCartById)
      .delete("/ResetCart",auth,isCustomer,ResetCart)
      .post("/ViewAllAmount",AllOrdersAmount)
      .post("/CreateCart",auth,isCustomer,CreateCart)
      .post("/UpdateQuantity",auth,isCustomer,UpdateQuantity)
      .post("/ViewAllCustomersOrders",ViewAllCustomerorders);

router.post("/my-server/create-paypal-order",auth,isCustomer,createOrder1)
      .post("/my-server/capture-paypal-order",auth,isCustomer,capturePayment1)
      .post("/get/client/token",auth,isCustomer,generateClientToken)

module.exports=router