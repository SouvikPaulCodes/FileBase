const {Router} = require("express")
const appController = require("../controllers/appController")
const loginRouter = require("./loginRouter")
const signupRouter = require("./signupRouter")
const dashboardRouter = require("./dashboardRouter")

const appRouter = Router()

appRouter.get("/", appController)

appRouter.use("/login", loginRouter)

appRouter.use("/signup", signupRouter)

appRouter.use("/dashboard", dashboardRouter)

module.exports = appRouter