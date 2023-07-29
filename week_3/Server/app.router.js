const express = require('express')
const router = express.Router()

const authController = require('./controller/auth')
router.post('/auth/login', authController.login)

const deviceController = require('./controller/device')
router.get('/device', deviceController.getDevices)
router.post('/device', deviceController.addDevice)
router.get('/logs', deviceController.getLogs)

module.exports = router
