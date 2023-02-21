/**
 * user.js
 * @description :: sequelize model of database table user
 */


import sequelizePaginate from "sequelize-paginate"
import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import bcrypt from "bcryptjs"
import { DataTypes } from "sequelize";
import { BCRYPT, USER_TYPE } from "../src/common/constants/constant";
import { USER_STATUS } from "../src/common/constants/constant";

let User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: USER_STATUS.ACTIVE
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: USER_TYPE.USER
    },
}, {
    hooks: {
        beforeUpdate: [
            async function (user, options) {
                if (user.password) {
                    user.password =
                        await bcrypt.hash(user.password, BCRYPT.SALT_ROUND);
                }
            },
        ],
        beforeCreate: [
            async function (user, options) {
                if (user.password) {
                    user.password =
                        await bcrypt.hash(user.password, BCRYPT.SALT_ROUND);
                }
            },
        ],

    }
})


User.prototype.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

User.prototype.toJSON = function () {
    return {
        userId: this.id,
        name: this.name,
        email: this.email,
        status: this.status,
        role: this.role
    };
};

sequelizeTransforms(User);
sequelizePaginate.paginate(User);
export default User;