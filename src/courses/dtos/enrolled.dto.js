

import Joi from 'joi'
export default Joi.object().keys({
  courseId: Joi.number().required(),
  userId: Joi.number().required()
})

