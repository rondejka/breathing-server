console.log(5)
const { response, application, json } = require("express")
const express = require("express")
const { MongoClient } = require("mongodb")
require ("dotenv").config()

const mongdbURL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@breathing-db.jblc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const mongodb = new MongoClient(mongdbURL)

const app = express()

app.use (express.json())

app.get("/", (req, res) => {
    res.send("hello world")
    console.log(10)
})

app.get("/score", async (req, res) => {
    const database = mongodb.db("breathing")
    const score = database.collection("score")

    const result = score.find()

    const response = []

    await result.forEach(e => response.push(e))

    res.json(response)

})


app.post("/score", async (req, res) => {
    const database = mongodb.db("breathing")
    const score = database.collection("score")

    /*const obj = {user: "ondejka", score: 100}  */

    await score.insertOne(req.body)

    res.json(req.body)

})




app.listen(process.env.PORT, async() => {
    await mongodb.connect()
    console.log("server started")
})
