const router = require("express").Router()
const ModelAgree = require("../model/agreeModel")
const agreeService = require("../service/agreeService")
const _ = require("lodash"); 

router.post("/",(req, res) => {
  const payload = req.body
  const newData = new ModelAgree(payload)
  agreeService
    .addData(newData)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/", (req, res) => {
  agreeService
    .findAll()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.post("/findpage", (req, res) => {
  agreeService
    .findPage(req.body)
    .then((data) => {
      console.log(data)
      var arrPath = []
      for (var i=0; i<data.length; i++) {
        if (data[i].data[5].pathname===req.body.path) {
          arrPath.push(data[i].data[5].pathname)
        }
      }
      // var cnt = _.countBy(arrYear); 
      // var resYear = {
      //   val: Object.values(cnt),
      //   key: Object.keys(cnt)
      // }
      res.json(arrPath)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/:id", (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  agreeService
    .findByid(id)
    .then((data) => {
      console.log(data) 
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/type/:id", (req, res) => {
  const id = req.params.id
  agreeService
    .findTypeByid(id)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.put("/:id", (req, res) => {
  const _id = req.params.id
  const newData = req.body.chat
  agreeService.addChatByid(_id, newData, (err, doc) => {
    if (err) return res.status(500).send(err)
    if (doc) {
      console.log(" this doc form put data : ", doc)
    }
    return res.status(201)
  })
})

router.post("/findyear", (req, res) => {
  console.log(req.body)
  agreeService
    .findYear(req.body)
    .then((data) => {
      console.log(data)
      var arrYear = []
      for (var i=0; i<data.length; i++) {
        var date = (data[i].createdAt).toISOString().slice(0, 7)
        var testttt = new Date(data[i].createdAt)
        console.log(testttt.getMonth())
        arrYear.push(date)
      }
      var cnt = _.countBy(arrYear); 
      var resYear = {
        val: Object.values(cnt),
        key: Object.keys(cnt)
      }
      res.json(resYear)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

module.exports = router
