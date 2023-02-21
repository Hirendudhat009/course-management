import express from "express";

const router = express.Router();

router.use('/auth', require('../../src/auth/auth.routes'))
router.use('/courses', require('../../src/courses/courses.routes'))


module.exports = router