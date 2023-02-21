import Joi from 'joi'
export default Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  duration: Joi.string().required(),
})