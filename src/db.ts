import dotenv from "dotenv"
import { MongoClient, WithId, Document } from "mongodb"

dotenv.config()

const mongodbURL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@breathing-db.jblc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const mongodb = {
    client: new MongoClient(mongodbURL),

    score: function () {
        return this.client.db("breathing").collection("score")
    },

    connect: async function () {
        await this.client.connect()
        console.log("Connected to database")
    },
}

export default mongodb
