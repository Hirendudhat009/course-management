/**
 * auth.js
 * @description :: service functions used in authentication
 */

import commonService from "../../utils/commonService";
import moment from "moment"
import { JWT, ROLE, USER_STATUS } from "../../src/common/constants/constant";
import { randomStringGenerator, encrypt, decrypt, randomNumberGenerator } from "../../src/common/helper";
import jwt from "jsonwebtoken";
import AccessToken from "../../models/accessToken";
import User from "../../models/user";
import RefreshToken from "../../models/refreshToken";
import UserResource from "../users/resources/user.resource";
import BadRequestException from "../common/exceptions/bad-request.exception";
import sendMail from "../common/email";

class authService {

    /**
     * @description : service to generate JWT token for authentication.
     * @param {obj} user : user who wants to login.
     * @return {string}  : returns access token.
     */
    static async generateAccessToken(user) {
        const jti = randomStringGenerator()
        const data = await encrypt(JSON.stringify({ user, jti }))
        const accessToken = jwt.sign({ data }, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN })
        const decodedToken = jwt.decode(accessToken)
        // store : access token 
        commonService.createOne(AccessToken, {
            token: jti,
            userId: user.id || user.userId,
            expiresAt: moment.unix(decodedToken.exp).format('YYYY-MM-DD HH:mm:ss')
        })
        return { accessToken, expiresAt: decodedToken.exp }
    };


    /**
     * @description : service to generate refresh token for authentication.
     * @param {string} accessToken : accessToken for refresh token.
     * @return {string}  : returns refresh token.
     */
    static async generateRefreshToken(accessToken) {
        const refreshToken = randomStringGenerator()
        const encryptedToken = jwt.decode(accessToken)
        const decodedToken = JSON.parse(await decrypt(encryptedToken.data))
        // store : refresh token
        await commonService.createOne(RefreshToken, {
            token: refreshToken,
            accessToken: decodedToken.jti,
            expiresAt: moment.unix(encryptedToken.exp).add(21, 'days').format('YYYY-MM-DD HH:mm:ss')
        })
        return refreshToken
    };


    /**
     * @description : Register service
     * @param {Object} data : registered user data
     * @returns nothing
     */
    static async register(data) {
        const { email, password } = data
        const user = await commonService.findOne(User, { email })
        if (user) {
            throw new BadRequestException("This email is already exist")
        }
        await commonService.createOne(User, { email, password })
    }



    /**
     * Login service
     * @param {Object} reqData 
     * @returns 
     */
    static async login(reqData) {
        const { email, password } = reqData
        const user = await commonService.findOne(User, { email }, { raw: false, plain: true })
        if (!user) { throw new BadRequestException('This email is not registered.') }

        const checkPassword = await user.isPasswordMatch(password)
        if (!checkPassword) throw new BadRequestException('Invalid Credential')

        const notActivated = await commonService.findOne(User, { email, status: USER_STATUS.INACTIVE }, { raw: true })
        if (notActivated) throw new BadRequestException('Your Account is not activated yet, please contact admin support')

        const getUser = await commonService.findOne(User, { email }, { raw: true, plain: true })
        const authentication = await authService.generateTokenPairs(getUser)
        return { ...new UserResource(getUser), authentication }
    }



    /**
     * @description : Generate access token & refresh token
     * @param {user} authUser : logged user data
     * @returns access & refresh token
     */
    static async generateTokenPairs(authUser) {
        const { accessToken, expiresAt } = await this.generateAccessToken(authUser)
        if (accessToken) { var refreshToken = await this.generateRefreshToken(accessToken) }
        return { accessToken, expiresAt, refreshToken }
    }
}

export default authService