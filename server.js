import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
//App Config
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://admin:mRaEmYlMBN9FVQ1Z@cluster0.b8tqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const pusher = new Pusher({
    appId: "1405415",
    key: "03d8fb08f202be489611",
    secret: "a6941d7280dbe1891719",
    cluster: "us3",
    useTLS: true
  });
  const db = mongoose.connection
  db.once("open", () => {
      console.log("DB Connected")
      const msgCollection = db.collection("messagingmessages")
      const changeStream = msgCollection.watch()
      changeStream.on('change', change => {
          console.log(change)
          if(change.operationType === "insert") {
              const messageDetails = change.fullDocument
              pusher.trigger("messages", "inserted", {
                  name: messageDetails.name,
                  message: messageDetails.message,
                  timestamp: messageDetails.timestamp,
                  received: messageDetails.received
  })
          } else {
              console.log('Error trigerring Pusher')
  } })
  })  

//Middleware
app.use(express.json())
app.use(Cors())
//DB Config
mongoose.connect(
    connection_url,
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)
//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
}) })
app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
} })
})
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))