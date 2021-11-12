import express from 'express'
import routes from './infra/routes'

import dotenv from 'dotenv'
dotenv.config()

const port = 3000

const app = express()
app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server is Running at Port ${port}`)
})
