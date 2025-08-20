const prisma = require("../prismaClient")
const supabase = require("../supabase")

const shareGet = (req, res) => {
    const gen = null
    const validity = null
    res.render("share", {file: req.params.fileid, user: req.user, gen: gen, validity: validity})
}

const sharePost = async (req, res) => {
    const fileId = req.params.fileid
    const currUser = req.user
    const duration = Number(req.body.valid)

    const file = await prisma.file.findUnique({
        where: {
            id: Number(fileId)
        }
    })

    const {data, error} = await supabase
                                .storage.from('files')
                                .createSignedUrl(file.path, 60*60*24*duration)

    res.render("share", {file: req.params.fileid, user: req.user, gen: data, validity: duration})
}

module.exports = {shareGet, sharePost}