const prisma = require("../prismaClient")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const supabase = require("../supabase")

const fileGet = (req, res) => {
    res.render("addFile", {user: req.user})
}

const filePost = [
    upload.single("file"),
    async (req, res) => {
        const currUser = req.user
        const file = req.file
        const name = req.file.originalname

        const {data, error} = await supabase.storage.from('files').upload(`${currUser.username}/${name}`, file.buffer, {
                                cacheControl: 3600,
                                contentType: file.mimetype
                            })

        await prisma.file.create({
            data: {
                title: name,
                path: `${currUser.username}/${name}`,
                uploaderID: currUser.id
            }
        })

        res.redirect("/dashboard")
    }
]

module.exports = {fileGet, filePost}