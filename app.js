const express = require("express")
const path = require("node:path")
const session = require("express-session")
const {PrismaSessionStore} = require("@quixo3/prisma-session-store")
const appRouter = require("./routes/appRouter")
const initializeAuth = require("./auth")
const prisma = require("./prismaClient")
const passport = require("./passport")
require("dotenv").config()

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))

app.use(session({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 10 * 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 10 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined 
    })
}))

initializeAuth(passport)

app.use(passport.initialize())
app.use(passport.session())
app.use("/", appRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})
