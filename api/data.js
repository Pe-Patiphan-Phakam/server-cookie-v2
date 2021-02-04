const router = require("express").Router()
const ModelData = require("../model/dataModel")
const dataService = require("../service/dataService")
const _ = require("lodash"); 
const fs = require('fs');

router.post("/",(req, res) => {
  const payload = req.body
  const newData = new ModelData(payload)
  dataService
    .addData(newData)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/", (req, res) => {
  console.log(req.params)
  dataService
    .findAll()
    .then((data) =>{ 
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.post("/search", (req, res) => {
  var value = {
    cookieId: req.body.cookieid,
    stdate: req.body.stdate,
    endate: req.body.endate,
    Ip: req.body.ip,
    type: req.body.type,
    browser: req.body.browser
  }
  dataService
    .findSearch(value)
    .then((data) => {
      console.log(data)
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/map", (req, res) => {
  dataService
    .findMap()
    .then((data) => {
      var arrValue = [];
      var arrTest = [];
      for (var x=0; x<data.length; x++) {
        if (data[x].data[2].latitude !== '' && data[x].data[3].longitude !== '' && data[x].data[2].latitude !== undefined) {
          arrTest.push(data[x].data[2].latitude+","+data[x].data[3].longitude)
        }
      }
      var cnt = _.countBy(arrTest); 
      var cntVal =  Object.values(cnt)
      var cntKey =  Object.keys(cnt)

      for (var i=0; i<cntVal.length; i++) {
        var lat = cntKey[i].split(",")[0];
        var lng = cntKey[i].split(",")[1];
        var latNum = parseFloat(lat);
        var lngNum = parseFloat(lng);
        var value = {
          latitude : latNum,
          longitude: lngNum,
          size: cntVal[i]+2,
          tooltip: cntVal[i],
        }
        arrValue.push(value)
      }
        var am4Color = [{
          "id": "TH",
          "fill": "#F05C5C"
        }]
        var Am4Map = {
          am4Val: arrValue,
          am4Color: am4Color
        }
      res.json(Am4Map)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/test", (req, res) => {
  fs.readFile('./country.json', (err, data) => {
      if (err) throw err;
      let value = JSON.parse(data);
      for (var i = 0; i < value.length; i++){
        if (value[i].latlng == "Thailand"){
          console.log(value[i].cca2)
        }
      }
      res.send(value)
  });
})

router.get("/:id", (req, res) => {
  console.log(req.params)
  const id = req.params.id
  dataService
    .findByid(id)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
})

router.get("/type/:id", (req, res) => {
  const id = req.params.id
  dataService
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
  dataService.addChatByid(_id, newData, (err, doc) => {
    if (err) return res.status(500).send(err)
    if (doc) {
      console.log(" this doc form put data : ", doc)
    }
    return res.status(201)
  })
})

module.exports = router
