const router = require("express").Router()
const ModelData = require("../model/dataModel")
const dataService = require("../service/dataService")

router.post("/",(req, res) => {
    console.log(req.body)
    dataService.updateOne({ _id: req.body._id }, { access: req.body.access })
    .then((data) => res.json(data))
    .catch((err) => {
    console.log(err)
    res.status(500).send(err)
    })
})

module.exports = router
