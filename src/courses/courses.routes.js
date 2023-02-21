import express from "express"
import asyncWrap from "express-async-wrapper";
import CourseController from "./courses.controller";
// validation file for this routes
import validator from "../../src/common/config/joi-validator";
import CourseDto from "./dtos/courses.dto";
import adminAuthentication from "../common/middleware/admin-authentication";
import authentication from "../common/middleware/authentication";
import enrolledDto from "./dtos/enrolled.dto";


const router = express.Router();

router.post('/',
  adminAuthentication,
  validator.body(CourseDto),
  asyncWrap(CourseController.createCourse))

router.get('/', authentication, asyncWrap(CourseController.getCourses))

router.patch('/',
  adminAuthentication,
  validator.body(CourseDto),
  asyncWrap(CourseController.updateCourse))

router.delete('/',
  adminAuthentication, asyncWrap(CourseController.deleteCourse))

router.put('/enrolled-student',
  adminAuthentication,
  validator.body(enrolledDto),
  asyncWrap(CourseController.enrolledStudentInCourse))



module.exports = router