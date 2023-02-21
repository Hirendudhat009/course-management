/**
 * constant.js
 * @description :: constants
 */

module.exports = {
    JWT: {
        SECRET: "coursemanagementcoursemanagement",
        EXPIRES_IN: "1 YEAR"
    },

    BCRYPT: {
        SALT_ROUND: 12
    },


    DEFAULT_PAGE: 1,
    DEFAULT_PER_PAGE: 25,


    COURSE_STATUS: {
        ACTIVE: "ACTIVE",
        INACTIVE: "inactive",
    },

    USER_STATUS: {
        ACTIVE: "active",
        INACTIVE: "inactive"
    },

    USER_TYPE: {
        USER: 1,
        ADMIN: 2
    },

    USER_COURSE_STATUS: {
        IN_PROCESS: 'inprocess',
        COMPLETED: 'completed'
    }
};