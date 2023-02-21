import moment from "moment";

export default class CourseResource {
  constructor(Courses) {
    return Courses.map((data) => ({
      courseId: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      duration: data.duration,
      createdAt: moment(data.createdAt).valueOf() / 1000,
    }))
  }
}
