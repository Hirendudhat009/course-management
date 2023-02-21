/**
 * authentication.js
 * @description :: middleware that checks authentication and authorization of user
 */

import passport from "passport"
import { USER_TYPE } from "../constants/constant"

const adminAuthentication = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // console.log(user)
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" })
    }
    if (user.role !== USER_TYPE.ADMIN) {
      return res.status(401).send({ message: "You can not perform this operation" })
    }
    req.user = user
    return next()
  })(req, res, next)
}


export default adminAuthentication;
