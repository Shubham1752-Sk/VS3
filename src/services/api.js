export const endpoints={
    SIGN_IN:"http://localhost:4000/api/v1/SignIn",
    LOGIN_IN:"http://localhost:4000/api/v1/login",
    SEND_OTP:"http://localhost:4000/api/v1/sendotp",
    ADD_CATEGORY:"http://localhost:4000/api/v1/CreateCategory",
    VIEW_CATEGORY:"http://localhost:4000/api/v1/ViewCategories",
    DELETE_CATEGORY:"http://localhost:4000/api/v1/DeleteCategory/",
    UPDATE_CATEGORY:"http://localhost:4000/api/v1/UpdateCategory/",
    ADD_PRODUCT:"http://localhost:4000/api/v1/CreateProduct",
    VIEW_PRODUCT:"http://localhost:4000/api/v1/ViewAllProducts",
    VIEW_PRODUCTS_BY_CATEGORY:"http://localhost:4000/api/v1/fetchProductsByCatgeory",
    RESET_PASSWORD_TOKEN:"http://localhost:4000/api/v1/reset-password-token",
    RESET_PASSWORD:"http://localhost:4000/api/v1/reset-password",
    PRODUCT_BY_ID:"http://localhost:4000/api/v1/ViewSingleProduct/",
    CREATE_RATING:"http://localhost:4000/api/v1/CreateRating",
    VIEW_ALL_RATING:"http://localhost:4000/api/v1/getAllRatings",
    ADD_TO_CART:"http://localhost:4000/api/v1/CreateCart",
    VIEW_CART:"http://localhost:4000/api/v1/viewCart",
    START_PAYMENT:"http://localhost:4000/api/v1/start-stripe-payment",
    GET_PRODUCTS_FILTERS:"http://localhost:4000/api/v1/filterFunction",
    GET_ALL_ORDERS_AMOUNT:"http://localhost:4000/api/v1/ViewAllAmount",
    UPDATE_PASSWORD:"http://localhost:4000/api/v1/ChangeUserPassword",
    REMOVE_ITEM_FROM_CART:"http://localhost:4000/api/v1/DeleteFromCart",
    UPDATE_QUANTITY:"http://localhost:4000/api/v1/UpdateQuantity",
    VIEW_ALL_CUSTOMERS : "http://localhost:4000/api/v1/fetchAllCustomers",
    DELETE_PRODUCT:"http://localhost:4000/api/v1/DeleteProduct/",
    CREATE_ORDER:"http://localhost:4000/api/v1/my-server/create-paypal-order",
    CAPTURE_PAYPAL_PAYMENT:"http://localhost:4000/api/v1/my-server/capture-paypal-order",
    GENERATE_PAYPAL_CLIENT_TOKEN:"http://localhost:4000/api/v1/get/client/token"
}