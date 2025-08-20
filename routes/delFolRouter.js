const {Router} = require("express")
const delFolGet = require("../controllers/delFolController")

const delFolRouter = Router({mergeParams: true})

delFolRouter.get("/", delFolGet)

module.exports = delFolRouter