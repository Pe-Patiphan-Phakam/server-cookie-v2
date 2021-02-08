const ModelAgree = require("../model/agreeModel")

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      ModelAgree.find({}, (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  findByid: (cid) => {
    return new Promise((resolve, reject) => {
      ModelAgree.find({ cookieId: cid }, (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  addData: (dataPayload) => {
    return new Promise((resolve, reject) => {
      ModelAgree.insertMany([dataPayload], (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  findYear: (value) => {
    var year = parseInt(value.year)
    console.log(year)
    return new Promise((resolve, reject) => {
      ModelAgree.find({
        createdAt: {
          '$gte': ""+year+"-01-01T00:00:00.000Z",
          '$lt': ""+year+"-12-31T23:59:59.590Z"
        }
      })
      .select('createdAt')
      .exec(function(err, doc) {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  findPage: (value) => {
    console.log(value)
    return new Promise((resolve, reject) => {
      ModelAgree.find({})
      .select('data.pathname createdAt')
      .exec(function(err, doc) {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
}
