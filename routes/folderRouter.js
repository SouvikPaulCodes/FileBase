const {Router} = require("express")
const {folderGet, folderPost} = require("../controllers/folderController")

const folderRouter = Router()

folderRouter.get("/", folderGet)
folderRouter.post("/", folderPost)

module.exports = folderRouter