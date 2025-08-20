const {Router} = require("express")
const delGet = require("../controllers/delController")

const delRouter = Router({mergeParams: true})

delRouter.get("/", delGet)

module.exports = delRouter