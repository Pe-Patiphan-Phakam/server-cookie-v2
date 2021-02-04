const ModelUsers = require("../model/users")

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      ModelUsers.find({}, (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
  findByid: (user,pass) => {
    return new Promise((resolve, reject) => {
      ModelUsers.find({ username:user ,password:pass}, (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
          if(JSON.stringify(doc) === "[]"){
            resolve({data:null,statusLogin:false})
          }else[
            resolve({data:doc,statusLogin:true})
          ]
        }
        
      })
    })
  },
  findTypeByid: (tid) => {
    return new Promise((resolve, reject) => {
      ModelUsers.find({ type: tid }, (err, doc) => {
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
      ModelUsers.insertMany([dataPayload], (err, doc) => {
        if (err) return reject(err)
        if (doc) {
          console.log(doc)
        }
        resolve(doc)
      })
    })
  },
}
