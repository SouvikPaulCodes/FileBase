const {Router} = require("express")
const {downGet, downGetFinal} = require("../controllers/downController")

const downRouter = Router({mergeParams: true})

downRouter.get("/", downGet)
downRouter.get("/final", downGetFinal)

module.exports = downRouter