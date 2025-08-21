const passport = require("../passport")
const {body, validationResult} = require("express-validator")

const loginGet = (req, res) => {
    if(req.user) {
        return res.redirect("/dashboard")
    }
    res.render("login")
}

const validateInput = [
    body("username").trim()
    .notEmpty().withMessage('Username is required!')
    .isAlphanumeric().withMessage('Username must be must only consist of alphabets and digits!')
    .escape(),

    body("password").trim()
    .notEmpty().withMessage('Password is required!')
]

const loginPost = [
    validateInput,

    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.render("login", {errors: errors.array()})
        }

        next()
    },

    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    })
]

module.exports = {loginGet, loginPost}