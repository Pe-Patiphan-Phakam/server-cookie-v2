const router = require("express").Router()
const con = require("../config/connectDB")
const { request } = require("express")
const body = require("body-parser")

router.use(body.json())

router.get("/", function (req, res) {
  con.connect(function (err) {
    if (err) throw err
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err
      res.send(result)
    })
  })
})

router.post("/login", function (req, res) {
  const { username, password } = req.body.data
  console.log(`data ==> ${username} password ==> ${password}`)
  con.connect(function (err) {
    if (err) throw err
    con.query(
      `select * from users where username = ${JSON.stringify(
        username
      )} and password = ${JSON.stringify(password)}`,
      function (err, result, fields) {
        if (err) {
          res.send(false)
        } else {
          res.send(true)
        }
      }
    )
  })
})

module.exports = router
