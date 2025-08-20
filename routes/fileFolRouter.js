const {Router} = require("express")
const {fileFolGet, fileFolPost} = require("../controllers/fileFolController")

const fileFolRouter = Router({mergeParams: true})

fileFolRouter.get("/", fileFolGet)

fileFolRouter.post("/", fileFolPost)

module.exports = fileFolRouter