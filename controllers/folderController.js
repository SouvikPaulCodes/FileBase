const prisma = require("../prismaClient")

const folderGet = (req, res) => {
    res.render("addFolder", {user: req.user})
}

const folderPost = async (req, res) => {
    const currUser = req.user

    await prisma.folder.create({
        data: {
            name: req.body.name,
            creatorID: currUser.id
        }
    })

    res.redirect("/dashboard")
}

module.exports = {folderGet, folderPost}