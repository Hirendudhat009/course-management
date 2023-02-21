import Course from "../../models/courses"
import commonService from "../../utils/commonService"
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../common/constants/constant";
import { Op } from "sequelize";
import EnrolledCourse from "../../models/enrolled-courses";
import CourseResource from "./resources/courses.resources";
import MyCourseResource from "./resources/my-courses.resources";

class CourseService {


  /**
   * create Course
   * @returns 
   */
  static async createCourse(authUser, data) {
    await commonService.createOne(Course, data)
  }

  /**
   * Get all Courses
   * @returns 
   */
  static async getCourses(authUser, page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE, search, sort = "DESC", myCourse) {
    const options = {
      order: [['createdAt', sort]],
      raw: true,
      nest: true
    }
    let query = {}

    // my course or all courses 
    if (myCourse == 1) {
      query = { userId: authUser.id }
      options.include = [{
        model: Course, as: "course"
      }]
      options.page = Number(page);
      options.paginate = Number(perPage);

      if (search) {
        query = {
          [Op.or]: [
            { '$course.title$': { [Op.like]: `%${search}%` } },
            { '$course.description$': { [Op.like]: `%${search}%` } }]
        }
      }
      const total = await commonService.findAllRecords(EnrolledCourse, query, options)
      options.page = Number(page);
      options.paginate = Number(perPage);
      const data = await commonService.findAllRecords(EnrolledCourse, query, options)
      return {
        data: new MyCourseResource(data), meta: {
          total: total.length,
          perPage: Number(perPage),
          totalPage: Math.ceil(total.length / Number(perPage)),
          currentPage: Number(page)
        }
      }
    }
    else {
      if (search) {
        query = {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } }]
        }
      }

      options.page = Number(page);
      options.paginate = Number(perPage);
      const { data, meta } = await commonService.findMany(Course, query, options)
      return { data: new CourseResource(data), meta: meta }
    }
  }



  /**
   * update Course
   * @returns 
   */
  static async updateCourse(courseId, data) {
    await commonService.updateByPk(Course, courseId, data)
  }

}


export default CourseService

