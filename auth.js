const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const prisma = require("./prismaClient")

const initializeAuth = (passport) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        username: `${username}`
                    }
                })

                if(!user) {
                    return done(null, false, {message: 'Incorrect Username!'})
                }

                const match = await bcrypt.compare(password, user.password)
                if(!match) return done(null, false, {message: 'Incorrect Password!'})

                done(null, user)
            }
            catch(err) {
                return done(err)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            done(null, user)
        }
        catch(err) {
            done(err)
        }
    })
}

module.exports = initializeAuth