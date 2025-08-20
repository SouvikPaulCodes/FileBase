const prisma = require("../prismaClient")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const supabase = require("../supabase")

const fileFolGet = async (req, res) => {
    const folder = await prisma.folder.findUnique({
        where: {
            id: Number(req.params.folderid)
        }
    })

    res.render("fileFolAdd", {folder: folder, user: req.user})
}

const fileFolPost = [
    upload.single("file"),
    async (req, res) => {
        const currUser = req.user
        const file = req.file
        const name = req.body.name
        const folder = req.params.folderid

        const {data, error} = await supabase.storage.from('files').upload(`${currUser.username}/${name}`, file.buffer, {
                                cacheControl: 3600
                            })

        await prisma.file.create({
            data: {
                title: name,
                folderID: Number(folder),
                path: `${currUser.username}/${name}`,
                uploaderID: currUser.id
            }
        })

        res.redirect(`/dashboard/folder/${folder}`)
    }
]

module.exports = {fileFolGet, fileFolPost}