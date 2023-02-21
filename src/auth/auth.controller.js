import AccessToken from "../../models/accessToken";
import User from "../../models/user";
import commonService from "../../utils/commonService";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, USER_TYPE } from "../common/constants/constant";
import BadRequestException from "../common/exceptions/bad-request.exception";
import UsersListResource from "../users/resources/users-list.resource";
import authService from "./auth.service";


class authController {
    /**
     * @description : Register service
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async register(req, res, next) {
        await authService.register(req.body)
        return res.send({ message: 'User added successfully' })
    }


    /**
     * @description: User login 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    static async login(req, res, next) {
        const data = await authService.login(req.body)
        return res.send({ message: 'login successfully', data })
    }



    /**
     * Logout
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async logOut(req, res, next) {
        const exist = await commonService.findOne(AccessToken, { token: req.user.jti })
        if (!exist) {
            throw new BadRequestException("Your sesson is expired, please login ")
        }
        await commonService.deleteMany(AccessToken, { token: req.user.jti })
        res.send({ message: 'success' })
    }



    /**
        * List of created Courses
        * @param {*} req 
        * @param {*} res 
        * @param {*} next 
        */
    static async usersList(req, res, next) {
        const options = {
            page: Number(req.query.page) || DEFAULT_PAGE,
            paginate: Number(req.query.perPage) || DEFAULT_PER_PAGE,
            raw: true,
        }
        const { data, meta } = await commonService.findMany(User, { role: USER_TYPE.USER }, options)
        res.send({ data: new UsersListResource(data), meta })
    }
}
export default authController