/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

import dbConnection from "../src/common/config/database";

//models
import AccessToken from "./accessToken";
import RefreshToken from "./refreshToken";
import User from "./user";
import Course from "./courses";
import EnrolledCourse from "./enrolled-courses";


const db = {};
db.sequelize = dbConnection;

// user -access_token
AccessToken.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    targetKey: 'id',
    onDelete: "CASCADE"
});
User.hasMany(AccessToken, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

// access_token -refresh_token
RefreshToken.belongsTo(AccessToken, {
    foreignKey: 'accessToken',
    as: 'accessTokens',
    targetKey: 'token',
    onDelete: "CASCADE"
});
AccessToken.hasMany(RefreshToken, {
    foreignKey: 'accessToken',
    sourceKey: 'token',
    onDelete: "CASCADE",
});


EnrolledCourse.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    targetKey: 'id',
    onDelete: "CASCADE"
});

User.hasMany(EnrolledCourse, {
    foreignKey: 'userId',
    sourceKey: 'id'
});


EnrolledCourse.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course',
    targetKey: 'id',
    onDelete: "CASCADE"
});

Course.hasMany(EnrolledCourse, {
    foreignKey: 'courseId',
    sourceKey: 'id'
});



export default db