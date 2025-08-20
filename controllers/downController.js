const prisma = require("../prismaClient")
const supabase = require("../supabase")

const downGet = async (req, res) => {
    const fileId = req.params.fileid
    const currUser = req.user

    const file = await prisma.file.findUnique({
        where: {
            id: Number(fileId)
        }
    })

    res.render("download", {user: currUser, file: file})

}

const downGetFinal = async (req, res) => {
    const fileId = req.params.fileid
    const currUser = req.user

    const file = await prisma.file.findUnique({
        where: {
            id: Number(fileId)
        }
    })

    const {data, error} = await supabase
                                .storage.from('files')
                                .download(file.path)

    const buffer = Buffer.from(await data.arrayBuffer());

    res.setHeader("Content-Disposition", `attachment; filename="${file.title}"`);
    res.setHeader("Content-Type", data.type);
    res.send(buffer);
}

module.exports = {downGet, downGetFinal}