import moment from "moment";

export default class MyCourseResource {
  constructor(courses) {
    return courses.map((data) => ({
      courseId: data.course.id,
      title: data.course.title,
      description: data.course.description,
      category: data.course.category,
      duration: data.course.duration,
      createdAt: moment(data.course.createdAt).valueOf() / 1000,
    }))
  }
}
