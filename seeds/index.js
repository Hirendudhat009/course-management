
const adminData = require("./admin");
import User from "../models/user";
const { USER_TYPE } = require("../src/common/constants/constant");

module.exports.seeder = async () => {
  const admins = await User.findOne({ where: { role: USER_TYPE.ADMIN } });
  if (!admins) {
    User.create(adminData).then(() =>
      console.log("admin data has been saved")
    );
  }
};