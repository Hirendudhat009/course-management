/**
 * Course.js
 * @description :: sequelize model of database table Course
 */


import sequelizePaginate from "sequelize-paginate"
import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";
import { COURSE_STATUS } from "../src/common/constants/constant";

let Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: COURSE_STATUS.ACTIVE
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
})


Course.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
};

sequelizeTransforms(Course);
sequelizePaginate.paginate(Course);
export default Course;