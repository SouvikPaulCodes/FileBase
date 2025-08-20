const {Router} = require("express")
const {fileGet, filePost} = require("../controllers/fileController")

const fileRouter = Router()

fileRouter.get("/", fileGet)
fileRouter.post("/", filePost)

module.exports = fileRouter