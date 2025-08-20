const {Router} = require("express")
const {dashGet} = require("../controllers/dashController")
const folderRouter = require("./folderRouter")
const fileRouter = require("./fileRouter")
const openFolderRouter = require("./openFolderRouter")
const logoutRouter = require("./logoutRouter")
const downRouter = require("./downRouter")
const shareRouter = require("./shareRouter")
const delRouter = require("./delRouter")
const delFolRouter = require("./delFolRouter")

const dashboardRouter = Router()

dashboardRouter.get("/", dashGet)
dashboardRouter.use("/addfolder", folderRouter)
dashboardRouter.use("/addfile", fileRouter)
dashboardRouter.use("/folder/:folderid", openFolderRouter)
dashboardRouter.use("/logout", logoutRouter)
dashboardRouter.use("/download/:fileid", downRouter)
dashboardRouter.use("/share/:fileid", shareRouter)
dashboardRouter.use("/delete/:fileid", delRouter)
dashboardRouter.use("/delete/folder/:folderid", delFolRouter)

module.exports = dashboardRouter