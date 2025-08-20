const prisma = require("../prismaClient")

const dashGet = async (req, res) => {
    const currUser = req.user

    const files = await prisma.file.findMany({
        where: {
            AND: {
                uploaderID: currUser.id,
                folderID: null
            }
        }
    })

    const folders = await prisma.folder.findMany({
        where: {
            creatorID: currUser.id
        }
    })
    
    res.render("dashboard", {user: currUser, files: files, folders: folders})
}

module.exports = {dashGet}