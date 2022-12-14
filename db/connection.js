// connection.js is going to house our connection to our local MongoDB. 

// import-style statement
const mongoose = require('mongoose'); 

mongoose.Promise = Promise;
let mongoURI = "";

if (process.env.NODE_ENV === "production") {
        mongoURI = process.env.DB_URL;
      } else {
        mongoURI = "mongodb://localhost/hso-exercise";
      }

// connect to the database, with the imported mongoose instance
mongoose.connect(mongoURI, {useNewUrlParser: true})
 .then(instance => {
     console.log(`Connected to db: ${instance.connections[0].name}`)
 }).catch(error => {
     console.log("Connection failed", error)
 })

// export-style statement
module.exports = mongoose;
