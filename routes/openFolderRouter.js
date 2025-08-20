const {Router} = require("express")
const openFolderGet = require("../controllers/openFolderController")
const fileFolRouter = require("./fileFolRouter")

const openFolderRouter = Router({mergeParams: true})

openFolderRouter.get("/", openFolderGet)
openFolderRouter.use("/addfile", fileFolRouter)

module.exports = openFolderRouter