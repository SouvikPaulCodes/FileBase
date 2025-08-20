const prisma = require("../prismaClient")
const supabase = require("../supabase")

const delFolGet = async (req, res) => {
    const folderId = req.params.folderid
    const currUser = req.user

    const files = await prisma.file.findMany({
        where: {
            folderID: Number(folderId)
        }
    })

    for(let i=0; i<files.length; i++){
        const {data, error} = await supabase
                                .storage.from('files')
                                .remove([files[i].path])
    }
    
    await prisma.file.deleteMany({
        where: {
            folderID: Number(folderId)
        }
    })

    await prisma.folder.delete({
        where: {
            id: Number(folderId)
        }
    })

    res.redirect("/dashboard")
}

module.exports = delFolGet