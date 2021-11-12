import express, { Request, Response } from 'express'

import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.HOST)

const port = 3000

const app = express()
app.use(express.json())

app.get('/', (request: Request, response: Response) => {
  response.json({ opa: true })
})

app.listen(port, () => {
  console.log(`Server is Running at Port ${port}`)
})
