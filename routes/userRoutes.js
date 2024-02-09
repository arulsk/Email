const express = require('express')
const route = express.Router()
const controller = require('../controller/signUP') 

route.post('/signUp',controller.signUp)

module.exports = {route}