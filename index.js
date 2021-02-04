const app = require("express")()
const http = require("http").createServer(app)
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')
const config = require('./config')
app.use(bodyParser.json())

// var whitelist = ['http://localhost/']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }



const {
  PORT = process.env.PORT || 5000,
  NODE_ENV,
  MONGO_URI,
  MONGO_USER,
  MONGO_PSW,
} = process.env


mongoose.connect(
  NODE_ENV === "production" ? config.DB_URI_PROD : config.DB_URI_PROD,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log("mongo connected")
)

app.use(cors());
app.use("/cookies/api/data", require("./api/data"))
app.use("/cookies/api/users",require("./api/users"))
app.use("/cookies/api/agree", require("./api/agree"))
app.use("/cookies/api/getmac", require("./api/getmac"))
app.use("/cookies/api/update", require("./api/update"))



http.listen(PORT, () => console.log(`listening ${PORT}`))
