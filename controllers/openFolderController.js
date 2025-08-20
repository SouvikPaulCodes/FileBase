const prisma = require("../prismaClient")

const openFolderGet = async (req, res) => {
    const currUser = req.user
    const folderId = req.params.folderid

    const folder = await prisma.folder.findUnique({
        where: {
            id: Number(folderId)
        }
    })

    const files = await prisma.file.findMany({
        where: {
            AND: {
                folderID: Number(folderId),
                uploaderID: currUser.id,
            }
        }
    })

    console.log(files)
    
    res.render("folder", {user: currUser, files: files, folder: folder})
}

module.exports = openFolderGet