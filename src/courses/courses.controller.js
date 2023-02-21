import Course from "../../models/courses"
import commonService from "../../utils/commonService"
import BadRequestException from "../common/exceptions/bad-request.exception"
import NotFoundException from "../common/exceptions/not-found.exception"
import CourseService from "./courses.service"
import User from "../../models/user"
import EnrolledCourse from "../../models/enrolled-courses"
import { USER_TYPE } from "../common/constants/constant"
class CourseController {

	/**
	 * Create Course
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	static async createCourse(req, res, next) {
		await CourseService.createCourse(req.user, req.body)
		res.send({ message: "Course created successfully" })
	}



		/**
		* List of created Courses
		* @param {*} req 
		* @param {*} res 
		* @param {*} next 
		*/
		static async getCourses(req, res, next) {
			const data = await CourseService.getCourses(
				req.user,
				req.query.page,
				req.query.perPage,
				req.query.search,
				req.query.sort,
				req.query.myCourse
			)
			res.send(data)
		}


	/**
	 * Update Course
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	static async updateCourse(req, res, next) {
		if (!req.query.id) {
			throw new BadRequestException("Course id is required")
		}
		const existCourse = await commonService.findByPk(Course, req.query.id)
		if (!existCourse) {
			throw new NotFoundException("Course id not found")
		}
		await CourseService.updateCourse(req.query.id, req.body)
		res.send({ message: "Course updated successfully" })
	}


	/**
	 * Delete Course
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	static async deleteCourse(req, res, next) {
		if (!req.query.id) {
			throw new BadRequestException("Course id is required")
		}
		const existCourse = await commonService.findByPk(Course, req.query.id)
		if (!existCourse) {
			throw new NotFoundException("Course id not found")
		}
		await commonService.deleteByPk(Course, req.query.id)
		res.send({ message: "Course deleted successfully" })
	}


	/**
	 * enrolled course
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	static async enrolledStudentInCourse(req, res, next) {
		const existCourse = await commonService.findByPk(Course, req.body.courseId)
		if (!existCourse) {
			throw new NotFoundException("Course is not found")
		}

		const existStudent = await commonService.findOne(User, { id: req.body.userId, role: USER_TYPE.USER })
		if (!existStudent) {
			throw new NotFoundException("Student is not found")
		}

		const existEnrolled = await commonService.findOne(EnrolledCourse, req.body)
		if (existEnrolled) {
			throw new BadRequestException("This Student already Enrolled in this course")
		}

		await commonService.createOne(EnrolledCourse, req.body)
		res.send({ message: "This Student enrolled successfully" })
	}

}
export default CourseController

