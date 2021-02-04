const ModelData = require("../model/dataModel")

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      ModelData.find({}, (err, doc) => {
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
      ModelData.find({ cookieId: cid }, (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  findTypeByid: (tid) => {
    return new Promise((resolve, reject) => {
      ModelData.find({ typeId: tid }, (err, doc) => {
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
      ModelData.insertMany([dataPayload], (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  updateOne: (updateId, access) => {
    console.log(updateId._id)
    console.log(access)
    return new Promise((resolve, reject) => {
      ModelData.updateOne({ _id: updateId._id }, { access: access.access }, function(err,doc) {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  findSearch: (value) => {
    var arrTotal = [];
    var cookieId = value.cookieId;
    var createdAt = {
      '$gte': ""+value.stdate+"T00:00:00.000Z",
      '$lt': ""+value.endate+"T23:59:59.590Z"
    }
    
    if (value.cookieId != "" && value.date != "" && value.Ip != "" && value.type != "" && value.browser != "") {
      arrTotal.push({cookieId, createdAt, "data.ipAdress": value.Ip, "data.diviceType": value.type, "data.browser": value.browser})

    } else if (value.date != "" && value.Ip != "" && value.type != "" && value.browser != "") {
      arrTotal.push({createdAt, "data.ipAdress": value.Ip, "data.diviceType": value.type, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.Ip != "" && value.type != "" && value.browser != "") {
      arrTotal.push({cookieId, "data.ipAdress": value.Ip, "data.diviceType": value.type, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.date != "" && value.type != "" && value.browser != "") {
      arrTotal.push({cookieId, createdAt, "data.diviceType": value.type, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.date != "" && value.Ip != "" && value.browser != "") {
      arrTotal.push({cookieId, createdAt, "data.ipAdress": value.Ip, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.date != "" && value.Ip != "" && value.type != "") {
      arrTotal.push({cookieId, createdAt, "data.ipAdress": value.Ip, "data.diviceType": value.type})

    } else if (value.Ip != "" && value.type != "" && value.browser != "") {
      arrTotal.push({"data.ipAdress": value.Ip, "data.diviceType": value.type, "data.browser": value.browser})
    } else if (value.date != "" && value.type != "" && value.browser != "") {
      arrTotal.push({createdAt, "data.diviceType": value.type, "data.browser": value.browser})
    } else if (value.date != "" && value.Ip != "" && value.browser != "") {
      arrTotal.push({createdAt, "data.ipAdress": value.Ip, "data.browser": value.browser})
    } else if (value.date != "" && value.Ip != "" && value.type != "") {
      arrTotal.push({createdAt, "data.ipAdress": value.Ip, "data.diviceType": value.type})
    } else if (value.cookieId != "" && value.type != "" && value.browser != "") {
      arrTotal.push({cookieId, "data.diviceType": value.type, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.Ip != "" && value.browser != "") {
      arrTotal.push({cookieId, "data.ipAdress": value.Ip,  "data.browser": value.browser})
    } else if (value.cookieId != "" && value.Ip != "" && value.type != "") {
      arrTotal.push({cookieId, "data.ipAdress": value.Ip, "data.diviceType": value.type})
    } else if (value.cookieId != "" && value.date != "" && value.browser != "") {
      arrTotal.push({cookieId, createdAt, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.date != "" && value.type != "") {
      arrTotal.push({cookieId, createdAt, "data.diviceType": value.type})
    } else if (value.cookieId != "" && value.date != "" && value.Ip != "") {
      arrTotal.push({cookieId, createdAt, "data.ipAdress": value.Ip})

    } else if (value.type != "" && value.browser != "") {
      arrTotal.push({"data.diviceType": value.type, "data.browser": value.browser})
    } else if (value.Ip != "" && value.browser != "") {
      arrTotal.push({"data.ipAdress": value.Ip, "data.browser": value.browser})
    } else if (value.Ip != "" && value.type != "") {
      arrTotal.push({"data.ipAdress": value.Ip, "data.diviceType": value.type})
    } else if (value.date != "" && value.Ip != "") {
      arrTotal.push({createdAt, "data.ipAdress": value.Ip})
    } else if (value.cookieId != "" && value.browser != "") {
      arrTotal.push({cookieId, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.type != "") {
      arrTotal.push({cookieId, "data.diviceType": value.type})
    } else if (value.cookieId != "" && value.Ip != "") {
      arrTotal.push({cookieId, "data.ipAdress": value.Ip})
    } else if (value.date != "" && value.browser != "") {
      arrTotal.push({createdAt, "data.browser": value.browser})
    } else if (value.cookieId != "" && value.date != "") {
      arrTotal.push({cookieId, createdAt})
    } else if (value.date != "" && value.type != "") {
      arrTotal.push({createdAt, "data.diviceType": value.type})

    } else if (value.cookieId != "") {
      arrTotal.push({cookieId})
    } else if (value.date != "") {
      arrTotal.push({createdAt})
    } else if (value.Ip != "") {
      arrTotal.push({"data.ipAdress": value.Ip})
    } else if (value.type != "") {
      arrTotal.push({"data.diviceType": value.type})
    } else if (value.browser != "") {
      arrTotal.push({"data.browser": value.browser})
    }
    console.log(arrTotal[0])
    return new Promise((resolve, reject) => {
      ModelData.find(
        arrTotal[0]
      , (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  findMap: () => {
    return new Promise((resolve, reject) => {
      ModelData.find({})
      .select('data.latitude data.longitude')
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
