const {Router} = require("express")
const {signupGet, signupPost} = require("../controllers/signupController")

const signupRouter = Router()

signupRouter.get("/", signupGet)

signupRouter.post("/", signupPost)

module.exports = signupRouter