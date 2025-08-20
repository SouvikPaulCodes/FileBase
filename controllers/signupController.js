const bcrypt = require("bcryptjs")
const prisma = require("../prismaClient")
const {body, validationResult} = require("express-validator")

const signupGet = (req, res) => {
    res.render("signup")
}

const validateInput = [
    body("username").trim()
    .notEmpty().withMessage('Username is required!')
    .isAlphanumeric().withMessage('Username must be must only consist of alphabets and digits!')
    .escape(),

    body("email").trim()
    .notEmpty().withMessage('Email is required!')
    .isEmail().withMessage('Please enter a valid email address'),

    body("password").trim()
    .notEmpty().withMessage('Password is required!'),

    body("confirm").trim()
    .notEmpty().withMessage('Please confirm the password!')
    .custom((value, {req}) => {
        return value === req.body.password
    }).withMessage('Doesnt match the entered password!')
]

const signupPost = [
    validateInput,

    async (req, res) => {
        console.log("Signup Post reached")
        console.log("Req Body:", req.body)

        const errors = validationResult(req)
        console.log("Errors:", errors.array())

        if(!errors.isEmpty()){
            return res.render("signup", {errors: errors.array()})
        }

        const {username, email, password} = req.body

        const name = await prisma.user.findUnique({
            where: {
                username: `${username}`
            }
        })

        if(name) {
            return res.render("signup", {errors: [{path: 'username', msg: 'Username already taken!'}]})
        }

        const mail = await prisma.user.findUnique({
            where: {
                email: `${email}`
            }
        })

        if(mail) {
            return res.render("signup", {errors: [{path:'email',  msg: 'E-Mail is already in use!'}]})
        }

        const hashed = await bcrypt.hash(password, 10)

        console.log(hashed)

        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashed
            }
        })

        res.redirect("/login")
    }
]

module.exports = {signupGet, signupPost}