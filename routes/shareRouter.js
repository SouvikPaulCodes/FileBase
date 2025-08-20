const {Router} = require("express")
const {shareGet, sharePost} = require("../controllers/shareController")

const shareRouter = Router({mergeParams: true})

shareRouter.get("/", shareGet)
shareRouter.post("/", sharePost)

module.exports = shareRouter