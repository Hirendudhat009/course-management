/**
 * EnrolledCourses.js
 * @description :: sequelize model of database table EnrolledCourse
 */


import sequelizePaginate from "sequelize-paginate"
import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";
import { USER_COURSE_STATUS } from "../src/common/constants/constant";

let EnrolledCourse = sequelize.define('enrolled_courses', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: USER_COURSE_STATUS.IN_PROCESS
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
})


EnrolledCourse.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
};

sequelizeTransforms(EnrolledCourse);
sequelizePaginate.paginate(EnrolledCourse);
export default EnrolledCourse;