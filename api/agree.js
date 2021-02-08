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
      var super_array =[];
      var super_date = [];
      for (var p=0; p<req.body.length; p++) {
        var sub_array = [];
        var sub_date = [];
        for (var i=0; i<data.length; i++) {
          if (data[i].data[5].pathname===req.body[p].value) { 
            sub_array.push((data[i].createdAt).toISOString().slice(0, 10)+data[i].data[5].pathname);
            sub_date.push((data[i].createdAt).toISOString().slice(0, 10));
          }
        }
        if (sub_array!==[]) {
          super_array.push(sub_array);
          super_date.push(sub_date);
        }
      }
      
      var arrRes2 = [];
      for (var w=0; w<super_array.length; w++) {
        var cnt = _.countBy(super_array[w]); 
        var val = Object.values(cnt);
        // var key = Object.keys(cnt)
        var cntt = _.countBy(super_date[w]); 
        var valt = Object.keys(cntt);

        var arrRes = [];
        for (var r=0; r<val.length; r++) {
          var newD = new Date(valt[r]);
          var arrPush = [Date.UTC(newD.getFullYear(), newD.getMonth(), newD.getDate()), val[r]]
          arrRes.push(arrPush);
        }
        if (arrRes!==[]) {
          arrRes2.push(
            {
              name: req.body[w].label, 
              data: arrRes,
              // type: "areaspline",
            }
          )
        }
      }
      // console.log(arrRes2)
      res.json(arrRes2)
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
