const router = require("express").Router()
const ModelUsers = require("../model/users")
const userService = require("../service/userService")
const jwt = require("jsonwebtoken")
const secret = "auth"
const bcrypt = require('bcrypt') 
const saltRounds = 10 

router.post("/",(req, res) => {
  const payload = req.body
  const newData = new ModelUsers(payload)
  userService
    .addData(newData)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
  })
  

router.get("/", (req, res) => {
  userService
    .findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.post("/checklogin", (req, res) => {
  console.log(req.body)
  const username = req.body.username
  const password = req.body.password
  userService
    .findByid(username,password)
    .then((data) => {
        const {statusLogin} = data
        if(statusLogin === true){
          const token = jwt.sign({ username }, secret)
          res.json({data,token })
        }else{
          const token = jwt.sign({ username }, secret)
          res.json({data,token:null })
        }
      }
    )
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/type/:id", (req, res) => {
  const id = req.params.id
  userService
    .findTypeByid(id)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.put("/:id", (req, res) => {
  const _id = req.params.id
  const newData = req.body.chat
  userService.addChatByid(_id, newData, (err, doc) => {
    if (err) return res.status(500).send(err)
    if (doc) {
      console.log(" this doc form put data : ", doc)
    }
    return res.status(201)
  })
})

router.post("/token", function (req, res) {
  const token = req.get("Authorization")
  jwt.verify(token, secret, function (err, decoded) {
    if (err) return res.status(500).send({ message: err })
    return res.send(decoded)
  })
})

module.exports = router
