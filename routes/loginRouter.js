const {Router} = require("express")
const {loginGet, loginPost} = require("../controllers/loginController")

const loginRouter = Router()

loginRouter.get("/", loginGet)

loginRouter.post("/", loginPost)

module.exports = loginRouter