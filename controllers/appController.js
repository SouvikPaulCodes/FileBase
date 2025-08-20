const appController = (req, res) => {
    console.log("AppRouter reached")
    res.render("index")
}

module.exports = appController