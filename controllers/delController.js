const prisma = require("../prismaClient")
const supabase = require("../supabase")

const delGet = async (req, res) => {
    const fileId = req.params.fileid
    const currUser = req.user

    const file = await prisma.file.findUnique({
        where: {
            id: Number(fileId)
        }
    })

    const {data, error} = await supabase
                                .storage.from('files')
                                .remove([file.path])

    await prisma.file.delete({
        where: {
            id: Number(fileId)
        }
    })

    if(file.folderID==null) res.redirect("/dashboard")

    res.redirect(`/dashboard/folder/${file.folderID}`)
}

module.exports = delGet