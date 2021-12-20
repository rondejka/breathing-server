import express, { Request, Response } from "express"
import mongodb from "./db"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => res.send("Hello world!"))

app.get("/score", async (req: Request, res: Response) => {
    const result = await mongodb.score().find().toArray()

    res.json(result)
})

app.post("/score", async (req: Request, res: Response) => {
    await mongodb.score().insertOne(req.body)

    res.json(req.body)
})

app.listen(process.env.PORT, async () => {
    await mongodb.connect()
    console.log(`Server running on port ${process.env.PORT}`)
})
