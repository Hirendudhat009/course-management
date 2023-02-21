import express from "express"
const router = express.Router();
const apisRoutes = require('./apis/index')

router.use('/api/v1', apisRoutes)


module.exports = router
