import express from 'express'
import routes from './routes'

import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is Running at Port ${PORT}`)
})
