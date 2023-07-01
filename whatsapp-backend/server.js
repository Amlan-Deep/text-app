import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1627867",
    key: "58a0727ae70879c7c79c",
    secret: "0f3ced7e74574c91f8d6",
    cluster: "ap2",
    useTLS: true
  });

//middleware
app.use(express.json())
app.use(cors())

//db config
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});


const connection_url = 'mongodb+srv://amlandeep09012003:uaGcgwZ4BYRgoJZp@cluster0.jlqeqhb.mongodb.net/';
mongoose.connect(connection_url);

// api route
app.get("/", (req, res) => res.status(200).send("Hello, world!"));

app.get('/messages/sync', (req, res) => {
    Messages.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
    });
  

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));


