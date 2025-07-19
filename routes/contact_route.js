const express = require("express")
const { sendEmailController } = require("../controller/contact_controller")


//middlewares

//router obj
const router = express.Router()
router.post("/sendEmail", sendEmailController )

module.exports = router