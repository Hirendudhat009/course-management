import passport from "passport"
import { ExtractJwt, Strategy as JWTstratagy } from "passport-jwt"
import { JWT } from "../constants/constant"
import moment from "moment";
import { decrypt } from "../helper";
import commonService from "../../../utils/commonService";
import AccessToken from "../../../models/accessToken";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT.SECRET,
}

passport.use(
    new JWTstratagy(options, async (jwtPayload, done) => {
        try {

            if (moment.utc().unix() > jwtPayload.exp) {
                return done(null, false)
            }
            const decodeData = JSON.parse(await decrypt(jwtPayload.data))
            if (!decodeData.jti) {
                return done(null, false)
            }
            const existJTI = await commonService.findOne(AccessToken, { token: decodeData.jti })
            if (!existJTI) {
                return done(null, false)
            }
            const user = { ...decodeData.user, jti: decodeData.jti }
            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    })
)
