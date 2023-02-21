import express from "express"

// middleware
import authentication from "../../src/common/middleware/authentication"
import adminAuthentication from "../common/middleware/admin-authentication";

// validation file for this routes
import validator from "../../src/common/config/joi-validator";
import authController from "./auth.controller";
import asyncWrap from "express-async-wrapper"

// dtos
import registerLoginDto from "./dtos/register.dto"
import loginDto from "./dtos/login.dto";



const router = express.Router();

router.post(
    '/add-user',
    adminAuthentication,
    validator.body(registerLoginDto),
    asyncWrap(authController.register)
)

router.post(
    '/login',
    validator.body(loginDto),
    asyncWrap(authController.login)
)

router.get('/users', adminAuthentication, asyncWrap(authController.usersList))


router.post('/logout', authentication, asyncWrap(authController.logOut))



module.exports = router